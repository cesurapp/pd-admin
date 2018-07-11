![page-login](https://user-images.githubusercontent.com/8649070/42580602-9e3bd2b0-8533-11e8-9a37-4ebb02765559.jpg)

![page-admin](https://user-images.githubusercontent.com/8649070/42580601-9e100496-8533-11e8-93bf-9d74e721ccd5.png)

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

* [User Management](#user-management)
* [Multilingual System](#multilingual-system)
* [Delegation](#delegation)
* [System Settings](#system-settings)
* [Mail Manager](#mail-manager)
* [Create New Widget](#create-new-widget)
* [Create New Menu](#create-new-menu)

#### User Management
Kullanıcı yönetimi için [pd-user](https://github.com/rmznpydn/pd-user) kullanılmıştır. Tüm ayarlar __config/packages/pd_user.yaml__ dosyasında bulunmaktadır.

__Create User:__
````
bin/console user:create
````
__Change User Password:__
````
bin/console user:changepassword
````
__Change User Roles:__
````
bin/console user:role
````

#### Multilingual System
Çoklu dil için kullanıcı oturumu kullanılmıştır. Her kullanıcı kendine özel dil seçimi yapabilir. 
Giriş yaptığında otomatik olarak yönlendirme yapılır. 

#### Delegation
Symfony güvenlik bileşeni ile birlikte [SensioFrameworkExtraBundle](https://symfony.com/doc/master/bundles/SensioFrameworkExtraBundle/annotations/security.html) kullanılmaktadır.
Varsayılan üç farklı kullanıcı rolü (ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN) bulunur. ROLE_SUPER_ADMIN tüm yetkilere sahiptir. ROLE_ADMIN ve ROLE_USER yetkileri sınırlandırılabilir
ve panele erişimi security.yaml dosyasından kapatılabilir.

#### System Settings
Sistem ayarları veritabanında tutulmaktadır. Tüm ayarlar container derleme sonrası parametre olarak kullanılabilir. Tüm ayarlar container ile birlikte derlendiğinden
sisteme ek yük oluşturmamaktadır. Symfony Forms kullanılarak ayarlar yapılandırılabilir ve "Menü Event" sistemi ile ayarlar menüsüne dışarıdan ekleme yapılabilir. 
Sistem ayarlarında yapılan değişikliklerden sonra mutlaka önbelleği temizleyin, akti durumda yeni ayarlar etkinleştirilmeyecektir.  

Example:
```
Coming SOON
```

#### Mail Manager
Posta yöneticisi Swiftmailer eklentisi olarak geliştirilmiştir. Swiftmailer ile gönderilen tüm postaların günlüğünü veritabanında depolar. Ek olarak şablon yöneticisidir. 
Posyalarınız için özel şablonlar (Email Template) oluşturup gönderim sırasında derlenmesini sağlayabilirsiniz. Paket ayarları __config/packages/pd_mailer.yaml__ dosyasında bulunmaktadır.
Detaylı bilgi için [pd-mailer](https://github.com/rmznpydn/pd-mailer) ziyaret edin

Example:
```
Coming SOON
```

#### Create New Widget
Widget sistemi Symfony "EventDispatcher Component" ile oluşturulmuştur. Her kullanıcı için ayarlanabilir bir yapıya sahip olup "Twig Template" motoru ile özel tasarım yapılabilir.
Detaylı bilgi için [pd-widget](https://github.com/rmznpydn/pd-widget) ziyaret edin. 

Example:
```
Coming SOON
```

#### Create New Menu
Menü sistemi Symfony "EventDispatcher Component" ile oluşturulmuştur. Oluşturulan her menü için varsayılan olarak Event oluşturulur, menü yapılandırması ile kapatılabilir. Detaylı bilgi için
[pd-menu](https://github.com/rmznpydn/pd-menu) ziyaret edin.

Example:
```
Coming SOON
```
