To run….

Pull **master** from the repo.

Navigate to the root of the repo.

Run **/vendor/bin/sail up -d**

Run **php artisan migrate**

Run **composer install**
 
Run **npm install**

Then once deps have been installed you should be able to view the front end by running **npm run dev** or **npm run build**.

Access the application at http://localhost

**EUA Weather app**

I have taken an iterative approach to this project.  There is a huge amount that could be done within the scope of the requirements.

**Proposed Project Phases:**

* **Phase 1:** Simple MVP application to cover specifications given.
* **Phase 2:** Integrate Google Maps to allow selection of location by dropping a pin as another option.
Improve text entry by adding dropdown of pre-filled city options and pass cords directly.  Implement restrictions on number of uses per user per day if required.
Add ability to remove favourites.
* **Phase 3:** Integrate Google Maps to show the weather graphically as well as in text format. 
* **Phase 4?:** Probably find someone way more imaginative than me to create the front end properly :-) 

