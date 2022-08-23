# https://jira.wwe.com/browse/NET-185
Feature: Global Navigation CTAs - (RW) - User in a logged in state

	Background:
		Given I am on home page
		And I accept cookies

	Scenario: Navigate to the superstars page
		Given the global navigation menu is visible
		When I click on the "superstars CTA"
		Then I should arrive on the "favourites page within superstar"
		And the end

	Scenario: Navigate to the tickets page
		Given the global navigation menu is visible
		When I click on the "tickets CTA"
		Then I should arrive on the "external tickets page (HTML link to wwe.com)"
		And the end

	Scenario: Navigate to the shop page
		Given the global navigation menu is visible
		When I click on the "shop CTA"
		Then I should arrive on the "external shop page (HTML link to wwe.com)"
		And the end

	Scenario: Clicking on the logo
		Given the global navigation menu is visible
		When I click on the "logo"
		Then I should arrive on the "homepage"
		And the end

	Scenario: Use search CTA find items
		Given the global navigation menu is visible
		When I click on the "search CTA"
		Then I should arrive on the "search page"
		And the end

	Scenario: Navigate to the Watch page
		Given I am a logged in user
		And the global navigation menu is visible
		When I click on the "watch CTA"
		Then I should arrive on the "watch featured page (default page)"
		And the end

	Scenario: Hover over account settings (Logged In User)
		Given I am a logged in user
		When I hover over the "account CTA/icon"
		Then a dropdown list will appear
		And it will contain My account, Continue Watching, Watchlist, Sign Out CTA
		And the end

	Scenario: Clicking account settings (Logged In User)
		Given I am a logged in user
		When I click on the "account CTA/icon"
		Then I should arrive on the "accounts page"
		And the end
