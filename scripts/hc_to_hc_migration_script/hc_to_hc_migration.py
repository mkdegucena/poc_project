# Help Center to Help Center Data Migration
# This include, Category , Section , Article, Article Attachement Inline
# Note: Add Local if possible,comments, or auto locale depending on the avaiable langauge in the instance, duplication?

import requests
import json
import urllib2
from bs4 import BeautifulSoup,SoupStrainer


#from ZD instance
zendeskFromUrl = "https://lazadademosg.zendesk.com/api/v2/"
zendeskFromEmail = "kiran@zendesk.com/token"
zendeskFromAPIKey = "kc3z4GmbeO5vcLPx57V8L1KGROzsAM2V4pI4yt3k"

#to ZD instance
zendeskToUrl = "https://lazadademomy.zendesk.com/api/v2/"
zendeskToEmail = "kiran@zendesk.com/token"
zendeskToAPIKey = "kc3z4GmbeO5vcLPx57V8L1KGROzsAM2V4pI4yt3k"

#remove category - use the ids
removeCategory = []
#remove section - use the ids
removeSection = []
#remove article - use the ids
removeArticle = []

#pulling of categories
print(">> Pulling the Categores")

responseFromCategories = requests.get(zendeskFromUrl + 'help_center/categories.json?sort_order=asc', auth=(zendeskFromEmail, zendeskFromAPIKey))

dataFromCategories = responseFromCategories.json()

if responseFromCategories.status_code == 200:
	dataFromCategories = responseFromCategories.json()
	for categories in dataFromCategories['categories']:
		if categories['id'] not in removeCategory:
			
			#create of category
			print(">> Creating Category: " + str(categories['name'].encode('utf8')))
			dataCategory = {"category": {"position": str(categories['position']), "locale": str(categories['locale']), "name":  str(categories['name'].encode('utf8')),"description": str(categories['description'].encode('utf8'))}}
			createCategory = requests.post(zendeskToUrl + 'help_center/categories.json',data=json.dumps(dataCategory), auth=(zendeskToEmail, zendeskToAPIKey),headers={'content-type': 'application/json'})
			print(createCategory.json())
			if createCategory.status_code == 201:
				dataCreateCategory = createCategory.json()
				
				#pulling of sections
				print(">> Pulling Section from: " + str(categories['name'].encode('utf8')))
				responseFromSections = requests.get(zendeskFromUrl + 'help_center/categories/' + str(categories['id']) + '/sections.json?sort_order=asc', auth=(zendeskFromEmail, zendeskFromAPIKey))
				if responseFromSections.status_code == 200:
					dataFromSections = responseFromSections.json()
					for sections in dataFromSections['sections']:
						if sections['id'] not in removeSection:
							
							#create of section
							print(">> Creating Section: " + str(sections['name'].encode('utf8')))
							
							dataSection = {"section": {"position": str(sections['position']), "locale": str(sections['locale']), "name": str(sections['name'].encode('utf8')), "description": str(sections['description'].encode('utf8'))}}	
							createSection = requests.post(zendeskToUrl + 'help_center/categories/' + str(dataCreateCategory['category']['id']) + '/sections.json',data=json.dumps(dataSection), auth=(zendeskToEmail, zendeskToAPIKey),headers={'content-type': 'application/json'})
							if createSection.status_code == 201:
								dataCreateSection = createSection.json()
								
								#pulling of articles
								responseFromAricles = requests.get(zendeskFromUrl + 'help_center/sections/' + str(sections['id']) + '/articles.json?sort_order=asc', auth=(zendeskFromEmail, zendeskFromAPIKey))
								
								if responseFromAricles.status_code == 200:
									dataFromArticles = responseFromAricles.json()
									for articles in dataFromArticles['articles']:
										# if articles['id'] not in removeArticle:
										# 	#extract all the images (please note that we also have some links that would be an attachment)
											htmlArticle = BeautifulSoup(articles['body'],"lxml")
											
										# 	#find all images
										# 	for img in htmlArticle.find_all('img'):
												
										# 		# get the filename
										# 		imgName = img['src'].split('/')[-1]
										# 		try:
										# 			imgFiles = {'file': (imgName, urllib2.urlopen(img['src']),{'inline':'true'})}			
										# 			responseFile = requests.post(zendeskToUrl + 'help_center/articles/attachments.json', auth=(zendeskToEmail, zendeskToAPIKey),data={'inline':'true'}, files=imgFiles)
										# 			if responseFile.status_code == 201:
										# 				dataFile = responseFile.json()
										# 				img['href'] = dataFile['article_attachment']['content_url']
										# 		except urllib2.HTTPError,e:
										# 			print("ERROR: " + e.code)
										# 		except urllib2.URLError, e:
										# 			print("ERROR: " + e.args)

											#create of article
											print(">> Creating Article: " + str(articles['name'].encode('ascii', 'ignore')))
											
											dataArticle = {"article": {"title": str(articles['name'].encode('ascii', 'ignore')), "body": str(htmlArticle) , "locale": str(articles['locale']) }}
											createArticle = requests.post(zendeskToUrl + 'help_center/sections/' + str(dataCreateSection['section']['id']) + '/articles.json',data=json.dumps(dataArticle), auth=(zendeskToEmail, zendeskToAPIKey),headers={'content-type': 'application/json'})
											print(createArticle.status_code)

print(">> Completed")
