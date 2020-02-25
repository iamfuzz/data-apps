# New Relic One Data App Generator 

## Getting Started

In order to use this application, you will need to have the dashboards you wish to use for your application in JSOn format.  If you own the dashboard and are logged in as a New Relic Admin, you can use the Export button at the bottom right-hand side of the dashboard itself.  Otherwise, you will need to use the dashboard API:

https://docs.newrelic.com/docs/insights/insights-api/manage-dashboards/insights-dashboard-api

## Pre-requesites

* Nerdpack Manager privileges within the account you wish to deploy to
* Dashboards in JSON format copied into: ./nerdlets/nr1-data-apps-nerdlet/components/insights-dashboard/dashboards/ 
* The RPM ID for the account you wish to deploy this in

## Installation

First, ensure that you have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [NPM](https://www.npmjs.com/get-npm) installed. If you're unsure whether you have one or both of them installed, run the following command(s) (If you have them installed these commands will return a version number, if not, the commands won't be recognized):

```bash
git --version
npm -v
```

Next, install the [NR1 CLI](https://one.newrelic.com/launcher/developer-center.launcher) by going to [this link](https://one.newrelic.com/launcher/developer-center.launcher) and following the instructions (5 minutes or less) to install and setup your New Relic development environment.

Next, to clone this repository and run the code locally against your New Relic data, execute the following commands(**You will need to enter 'y' when prompted to create a new UUID for the application**):

```bash
nr1 nerdpack:clone -r https://github.com/iamfuzz/data-apps
cd data-apps
npm update
nr1 nerdpack:uuid --generate
```

Create the dashboards directory:

```bash
mkdir nerdlets/nr1-data-apps-nerdlet/components/insights-dashboard/dashboards
```

**You will now need to copy all of your JSON dashboards into the directory you just created above**

Execute the following command which will generate a configuration file for your Data App:

```bash
python2.7 configure.py
```

Execute the following command to build your Data app:

```bash
python2.7 configure.py config.json
```

Once you have satisfied the configuration requirements above, run the following command to launch the application:

```bash
nr1 nerdpack:serve
```

Visit [https://one.newrelic.com/?nerdpacks=local](https://one.newrelic.com/?nerdpacks=local), navigate to the Nerdpack, and :sparkles:

## Deploying this Nerdpack

Open a command prompt in the nerdpack's directory and run the following commands.

```bash
# If you need to create a new uuid for the account to which you're deploying this Nerdpack, use the following
# nr1 nerdpack:uuid -g [--profile=your_profile_name]
# to see a list of APIkeys / profiles available in your development environment, run nr1 credentials:list
nr1 nerdpack:publish [--profile=your_profile_name]
nr1 nerdpack:deploy [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
nr1 nerdpack:subscribe [-c [DEV|BETA|STABLE]] [--profile=your_profile_name]
```

Visit [https://one.newrelic.com](https://one.newrelic.com), navigate to the Nerdpack, and :sparkles:

## Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR SUPPORT, although you can report issues and contribute to the project here on GitHub.

_Please do not report issues with this software to New Relic Global Technical Support._
