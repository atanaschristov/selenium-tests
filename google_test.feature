Feature: Check Google search page after making a search

# Background:
# 	Given I go to "www.google.com" page
	# When I see disclamer overlay
	# And I click on "Agree" button
	# Then Than I shell see the "search" fieled

	Scenario: The user is at the main google page
		Given I go to "http://www.google.com" page
		When I fill the "search" field with "webdriver" value
		And I click on the "search" button
		Then I will be redirected to the search result page
		And the page title will contain "webdriver" in it

	# Scenario: AC1: Search field focus https://jira.wwe.com/browse/NET-6671
	# 	Given the Search icon is displayed in the global navigation in inactive state
	# 	When I select the icon
	# 	Then the search bar will be displayed in an active state as per Search_1280px_inactive_vs_active.png
	# 	And the placeholder text 'Search for Superstars, News, Shows...' will be visible within the search bar
