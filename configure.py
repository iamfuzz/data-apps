#!/usr/bin/python

import requests
import json
import time
import sys
import os
import pprint
import shutil
pp = pprint.PrettyPrinter()

def open_file_string(fname):
	fbuffer = open(fname)
	sdata = fbuffer.read()
	fbuffer.close()
	return sdata	

def open_file_list(fname):
	fbuffer = open(fname)
	ldata = fbuffer.readlines()
	fbuffer.close()
	return sldata	

def write_file_string(fname,sdata):
	fbuffer = open(fname,'w')
	fbuffer.write(sdata)
	fbuffer.close()

def build_imports_snippet(count):
	snippet = []
	for i in range(1,count + 1):
		snippet.append("import Tab" + str(i) + " from './components/tab" + str(i) + "';")	
	return "\n".join(snippet)

def build_jsx(count):
	fbuffer = open(jsx_template)
	lines = fbuffer.readlines()
	fbuffer.close()
	if count == 5:
		jsx = lines
		return "".join(jsx)
	jsx = []
	for line in lines:
		if line.count("main-tab") <= 0:
			jsx.append(line)
			continue
		for i in range(1,count + 1):
			if line.count("main-tab-" + str(i)) >= 1:
				line = line.replace("#Tab#",data['tabs'][str(i)]['name'])			
				jsx.append(line)
	return "".join(jsx)

dashboards_dir = "./nerdlets/nr1-data-apps-nerdlet/components/insights-dashboard/dashboards/"
nerdlet_config = "./nerdlets/nr1-data-apps-nerdlet/nr1.json"
tabs_dir = "./nerdlets/nr1-data-apps-nerdlet/components/data-apps/"
sub_tabs_dir = tabs_dir + "components/"
jsx_template = "tabs.jsx"
launcher = "./launchers/nr1-data-apps/nr1.json"
data = {}

#make sure user has dropped in dashboards
if len(os.listdir(dashboards_dir)) <= 0:
	print "Please drop one or more dashboards into: " + dashboards_dir
	sys.exit(1)

#perform some cleanup in case this app has been run before
for dirname in os.listdir(sub_tabs_dir):
	if dirname == "tab1":
		continue
	shutil.rmtree(sub_tabs_dir + dirname)

#if no config file is provided, gather data manually from user
if len(sys.argv) < 2:
	data['app_name'] = raw_input("What would you like to name your application?: ")
	data['account_id'] = raw_input("What is the id of the account you wish to deploy this application into?: ")
	main_tab_count = raw_input("How many top level tabs would you like this data app to contain? (1-5): ")
	
	try:
		main_tab_count = int(main_tab_count)
	except:
		print "A number between 1 and 5 is required, exiting."
		sys.exit(1)
	
	if (main_tab_count < 1) or (main_tab_count > 5):
		print "A number between 1 and 5 is required, exiting."
		sys.exit(1)
	
	data['tabs'] = {}
	for i in range(1,main_tab_count + 1):
		i_str = str(i)
		data['tabs'][i] = {}
		tab_name = raw_input("What would you like to name tab " + i_str + "?: ")
		data['tabs'][i]['name'] = tab_name
		sub_tab_count = raw_input("How many dashboards will tab " + i_str + " contain? (1-9): ")
		try:
			sub_tab_count = int(sub_tab_count)
		except:
			print "A number between 1 and 9 is required, exiting."
			sys.exit(1)
		if (sub_tab_count < 1) or (sub_tab_count > 9):
			print "A number between 1 and 9 is required, exiting."
			sys.exit(1)
		data['tabs'][i]['dashboards'] = {}
		for d in range(1,sub_tab_count + 1):
			d_str = str(d)
			dashboard_name = raw_input("What would you like to name dashboard " + d_str + " in tab " + tab_name + "?: ")
			counter = 1
			options = {}
			for fname in os.listdir(dashboards_dir):
				options[counter] = fname
				counter = counter + 1
        		print ""
        		pp.pprint(options)
        		print ""
			dashboard_id = raw_input("Please enter the number of the dashboard you'd like to use: ")
			data['tabs'][i]['dashboards'][d] = {}
			data['tabs'][i]['dashboards'][d]['name'] = dashboard_name
			try:
				dashboard_id = int(dashboard_id)
			except:
				print "You did not enter a valid dashboard number, exiting."
				sys.exit(1)
			data['tabs'][i]['dashboards'][d]['id'] = options[dashboard_id]

	write_file_string("config.json",json.dumps(data,indent=4))
	print "The configuration for your data app has been written to config.json"
	print "Please run the following command to finish building your Data App:"
	print "python2.7 configure.py config.json"
	sys.exit(0)

else:
	#if a config file is provided, use it instead
	sdata = open_file_string(sys.argv[1])
	data = json.loads(sdata)

#open nerdlet json file and change app's display name
nerdlet_data = open_file_string(nerdlet_config)
nerdlet_json_data = json.loads(nerdlet_data)
nerdlet_json_data['displayName'] = data['app_name']
write_file_string(nerdlet_config,json.dumps(nerdlet_json_data, indent=4))

#open tabs file
tabs_view = open_file_string(tabs_dir + "index.js.template")

#write account number to tabs file
tabs_view = tabs_view.replace("DEADBEEF",data['account_id'])

#add import lines for the proper number of tabs
imports_snippet = build_imports_snippet(len(data['tabs'].keys()))
tabs_view = tabs_view.replace("import Tab1 from './components/tab1';",imports_snippet)

#add top level tabs
jsx = build_jsx(len(data['tabs'].keys()))
tabs_view = tabs_view.replace("#JSX#",jsx)

#write new tabs file
write_file_string(tabs_dir + "index.js",tabs_view)

#create directory for each sub-tab
for i in range(1,len(data['tabs'].keys()) + 1):
	if i > 1:
		shutil.copytree(sub_tabs_dir + "tab1",sub_tabs_dir + "tab" + str(i))
	sub_tabs_view = open_file_string(sub_tabs_dir + "tab" + str(i) + "/index.js.template")
	dashboards = data['tabs'][str(i)]['dashboards']
	#add dashboards as sub-tabs
	imports = []
	tabs_items = []
	counter = 1
	for d in dashboards.keys():
		dashboard = dashboards[d]
		imports.append("import SubTab" + str(counter) + " from '../../../insights-dashboard/dashboards/" + dashboard['id'] + "';")				
		tabs_items.append("<TabsItem value='tab-" + str(counter) + "' label='" + dashboard['name'] + "'><InsightsDashboard accountId={accountId} dashboard={SubTab" + str(counter) +  "} /></TabsItem>")
		counter = counter + 1
	sub_tabs_view = sub_tabs_view.replace("import SubTab1 from '../../../insights-dashboard/dashboards/tab1.json';","\n".join(imports))
	sub_tabs_view = sub_tabs_view.replace("#JSX#","\n".join(tabs_items))
	#write new sub-tabs file
	write_file_string(sub_tabs_dir + "tab" + str(i) + "/index.js",sub_tabs_view)

#ensure all dashboard files have the proper account id
for dfile in os.listdir(dashboards_dir):
	ddata = open_file_string(dashboards_dir + dfile)
	json_ddata = json.loads(ddata)
	json_ddata['dashboard_account_id'] = data['account_id']	
	write_file_string(dashboards_dir + dfile,json.dumps(json_ddata,indent=4))

#Change app name
ldata = open_file_string(launcher)
json_ldata = json.loads(ldata)
json_ldata['displayName'] = data['app_name']
write_file_string(launcher,json.dumps(json_ldata,indent=4))
