pdAdmin 
=========

Symfony Powerful Dashboard & Admin. Developed with **Symfony 4 Flex** framework.

## Installation
1. Download pdAdmin
2. Install composer dependency `$ composer install`
3. Create and configure the `.env` file. Details are available in `.env.dist` file.
4. Create database schemas `$ bin/console doctrine:schema:create --force`

## User Management
Create User:
````
$ bin/console user:create
````
Change User Password:
````
$ bin/console user:changepassword
````
Change User Roles:
````
$ bin/console user:role
````

## PHPUnit Test
Set the database connection to the `phpunit.xml.dist` file:
````xml
<env name="DATABASE_URL" value="mysql://root:root@127.0.0.1:3306/dbname"/>
````
Run all test:
````
$ bin/phpunit
````

## Change Settings
Clear the cache after making changes to the system settings. 
````
$ bin/console cache:clear
````
or request this url:
````
example.com/admin/refresh/cache
````