# ReCentiFi

# Create an incentive protocol for volunteers to gate access to an suite of tier gated services.

## Tools

1. **Worldcoin** - proof of humanity
2. **Polygon ID** - issue and verify credentials 
3. **Filecoin** -  storage and compute 
4. **Uniswap v4** - hook to gate access w/ credentials / NFT 

## Components / User Flow

1. Volunteer uploads photo/video of footage of environmental service to Filecoin database 
2. System verification of the entry (executed by an AI model - kinetic 400(441 - garbage collecting)
3. System points to volunteer’s account (given the positive verification) 
4. Volunteer claims Polygon ID, which provides them access to benefits and services 
    1. The Polygon ID can be claimed at a designated number of points 
    2. There are different benefits and services at different point tiers: Tier I, Tier II, Tier III

## Services

- **Uniswap v4 hook** to provide access to only people with certain credentials (Polygon ID)
- AI chatbot
- Private events, including travel stipends for global events

## Get Started

```bash
# Clone the repository
git clone https://github.com/KaiStryker/ReCentiFi.git

# Navigate to the directory
cd ReCentiFi

# Install dependencies
npm install
```

## Dependencies for AI Model

In order to run the ai model, python needs to be installed.

```bash
# Make sure python is downloaded
python3 --version
```

If not installed, [install](https://www.python.org/downloads/) the latest version from the website. 

Run the Installer:
Once the .pkg file is downloaded, double-click on it to run the installer and follow the installation steps.

Verify Installation:
Open a new Terminal and type python3 --version and press Enter. This should display the version of Python you just installed.

Once installed, run the following:

```bash
pip install openvino
brew install opencv
```

## Run Server

```bash
# Navigate to the directory
cd backend

# Install dependencies
npm install

#run script
node server.js
```

## Run Frontend

```bash
# Navigate to the directory
cd frontend

# Install dependencies
npm install

#run script
npm run dev
```

## Images

<img width="1401" alt="ReCentiFi" src="https://github.com/KaiStryker/ReCentiFi/assets/111013332/e4f06ead-7e25-40cf-b459-917b3015e542">

<img width="1429" alt="Screenshot 2023-09-24 at 8 51 00 AM" src="https://github.com/KaiStryker/ReCentiFi/assets/111013332/f69d46e4-9dbb-4378-a831-91bf73f705f9">

<img width="1429" alt="Screenshot 2023-09-24 at 8 51 23 AM" src="https://github.com/KaiStryker/ReCentiFi/assets/111013332/687673c6-399f-4448-a927-03747a917161">
