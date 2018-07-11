pdAdmin 
=========
Symfony Powerful Dashboard & Admin. Developed with **Symfony 4 Flex** framework.

Installation
--------------------
1. Download pdAdmin
    ```
    composer create-project rmznpydn/pd-admin pdadmin 
    ```
2. Create and configure the `.env` file. Details are available in `.env.dist` file.

3. Create database schemas
    ```
    bin/console doctrine:schema:create --force
    ```
4. Run built-in web server
     ```
     bin/console server:start
     ```

Documentation
--------------------

* [User Management](User Management)
* [Multilingual System](Multilingual System)
* [Delegation]()
* [System Settings]()
* [Mail Manager]()
* [Create New Widget]()
* [Create New Menu]()
* [Additional Packages]()

#### User Management
Create User:
````
bin/console user:create
````
Change User Password:
````
bin/console user:changepassword
````
Change User Roles:
````
bin/console user:role
````

#### Multilingual System
Çoklu dil için kullanıcı oturumu kullanılmıştır. Her kullanıcı kendine özel dil seçimi yapabilir. 
Giriş yaptığında otomatik olarak yönlendirme yapılır. 

#### Delegation
#### System Settings
#### Mail Manager
#### Create New Widget
#### Create New Menu
#### Additional Packages
