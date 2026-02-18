#!/bin/bash

# load npm dependencies
echo "Installing npm packages..."
npm i

cd server
npm i
cd ../

cd client
npm i
cd ../

echo

getHTTPSPassword() {
    read -sp "Enter HTTPS encryption password: " pass
    echo "$pass"
}

generateHTTPSKeyAndCert() {
    cd server

    yes '' | openssl req -x509 -newkey rsa:4096 -keyout key.pem -passout pass:$1 -out cert.pem -sha256 -days 365 &> /dev/null
        
    cd ../
}

# check for environment files
if [ ! -f "server/.env" ] || [ ! -f "client/.env" ]; then
    echo "Creating new env files..."
    rm server/.env client/.env server/*.pem &> /dev/null

    # set supabase info
    read -p "Enter Supabase public URL: " supabaseUrl
    read -p "Enter Supabase publishable key: " supabaseKey

    # create HTTPS keys
    pass=$(getHTTPSPassword)
    $(generateHTTPSKeyAndCert $pass)
    
    # write server env file
    port="8000"
    touch server/.env
    echo "# .env" >> server/.env
    echo "PORT=$port" >> server/.env
    echo "HTTPS_KEY_PASSPHRASE=$pass" >> server/.env
    echo "NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl" >> server/.env
    echo "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$supabaseKey" >> server/.env
    
    # write client env file
    touch client/.env
    echo "# .env" >> client/.env
    echo "VITE_PUBLIC_SUPABASE_URL=$supabaseUrl" >> client/.env
    echo "VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$supabaseKey" >> client/.env
    # check HTTPS certifications 
elif [ ! -f "server/cert.pem" ] || [ ! -f "server/key.pem" ]; then
    echo "Creating new HTTPS key/cert..."
    rm server/*.pem &> /dev/null

    passEnvLine=$(grep "HTTPS_KEY_PASSPHRASE=" server/.env)

    # get password for keys
    if [ -z passEnvLine ]; then
        pass=$(getHTTPSPassword)

        echo "HTTPS_KEY_PASSPHRASE=$pass" >> server/.env
    else 
        pass=${passEnvLine#*=}
    fi

    $(generateHTTPSKeyAndCert $pass)
fi
