# https://jira.wwe.com/browse/NET-324
Feature: Log in successful

	Background:
		Given I am on home page
		And I accept cookies

	Scenario: User inputs correct email and correct password
		# Given a user's email and password have been successfully validated
		Given I am a logged in user
		When the home page is being surfaced a spinner is displayed
		Then the home page is loading
		And the top navigation bar is displayed
		And the global navigation menu is visible
		# And there is the WWE logo which is centre configured at top of the page
		# And there is a search icon on the top right hand side
		And the end
