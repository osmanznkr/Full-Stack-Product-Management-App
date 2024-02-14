# Full-Stack-Product-Management-App


## Proje Hakkında

Proje full stack bir proje olup backend ve frontend kısımları birlikte geliştirilmiştir. Backend kısmında geliştirme için Express.js kullanılıp Javascript dili ile oluşturulurken, frontend kısmı React kullanılarak Typescript dili ile oluşturulmuştur. Proje veritabanı olarak PostgreSQL kullanılarak veritabanı şemaları oluşturulmuş ve sorguları yazılmıştır. API istekleri Postman uygulaması aracılığıyla kontrol edilirken, veritabanı için pgAdmin 4 uygulaması kullanılmıştır.

 
## Projenin Amacı

 Proje, ilgili firmadaki yönetici ve çalışan personellerin ürün durumları hakkında hem bilgi sahip olup hem de ürün yönetimini gerçekleştirebileceği bir uygulama meydana getirmeyi amaçlamaktadır.


 ## Kullanım Senaryosu

 Projede iki türlü kullanıcı mevcuttur.
 
 İlk kullanıcı tipi 'admin' rolündedir ve tam erişim yetkisine sahiptir. Kullanıcı adı ve şifresiyle uygulamaya giriş yapar. Ürün durumlarını görüntüleyebilir, düzenleyebilir, silebilir ve güncelleyebilir. Bunların yanısıra yeni bir kullanıcı oluşturabilir ve kullanıcıyı yetkilendirebilir..

 ikinci kullanıcı 'employee' rolündedir. Ürünleri sadece görüntüleme ve detaylarına ulaşma yetkisine sahiptir. Bunların yanısıra kendi profil bilgilerini düzenleyebilir. 

 
## Kullanılan Paketler

### Backend:


- body-parser (^1.20.2): HTTP isteklerinden gelen verileri işlemek için kullanılır. Özellikle POST isteklerinden gelen verileri okumak ve kullanmak için kullanışlıdır.

- cors (^2.8.5): Cross-Origin Resource Sharing (CORS) politikalarını uygulamak için kullanılır. Client tarafından gelen isteklerin kaynağını doğrulamak ve izin vermek için kullanılır.

- dotenv (^16.4.1): Çevre değişkenlerini yönetmek için kullanılır. Özellikle geliştirme ve dağıtım ortamlarında kullanılan hassas bilgileri (örneğin, veritabanı bağlantı bilgileri) güvenli bir şekilde saklamak için kullanışlıdır.

- express (^4.18.2): Web uygulamaları oluşturmak için kullanılan popüler bir web çatısıdır. HTTP sunucu ve yönlendirme gibi temel web sunucu işlevlerini sağlar.

- node-oauth2-server (^2.4.0): OAuth 2.0 yetkilendirme sunucusu oluşturmak için kullanılır. Kullanıcıların uygulamalara erişim izinlerini yönetmek için kullanılır.

- nodemon (^3.0.3): Geliştirme sürecinde kod değişikliklerini izlemek ve sunucuyu otomatik olarak yeniden başlatmak için kullanılır. Bu, geliştirme sürecini daha verimli hale getirir.

- pg (^8.11.3): PostgreSQL veritabanıyla etkileşim kurmak için kullanılır. Node.js uygulamalarının PostgreSQL veritabanını kullanmasını sağlar.


### Frontend:

- react (^18.2.0) ve react-dom (^18.2.0): React uygulamasını oluşturmak için gerekli olan temel paketlerdir.

- react-router-dom (^6.22.0): React uygulamalarında sayfa yönlendirmesi ve yönetimi için kullanılan bir pakettir.

- react-redux (^9.1.0): React uygulamalarında Redux durum yönetimini kullanmak için gereken bağlayıcıdır.

- @reduxjs/toolkit (^2.1.0): Redux durum yönetim kütüphanesinin kullanımını kolaylaştıran bir araç kiti sağlar. Redux tabanlı uygulamaları geliştirmeyi daha hızlı ve daha az kod yazarak sağlar.

- typescript (^4.9.5): JavaScript projelerinde tip güvenliği sağlamak için kullanılan bir programlama dili ve derleyicisidir.

- axios (^1.6.7): HTTP isteklerini yapmak için kullanılan bir kütüphanedir. API'lerle iletişim kurmak için yaygın olarak kullanılır.

- @mui/material (^5.15.9): Material-UI bileşen kütüphanesidir. Temel React bileşenlerini ve stil özelliklerini içerir.

- @material-ui/core (^4.12.4): Google'ın Material Design prensiplerine dayalı bileşen kütüphanesidir. UI tasarımında kullanılan önceden oluşturulmuş bileşenleri içerir.

- @mui/icons-material (^5.15.9): Material-UI bileşenlerinde kullanılmak üzere ikonlar sağlar.

- @mui/x-data-grid (^6.19.4): Material-UI bileşenleri arasında yer alan bir veri tablosu bileşenidir. Büyük veri kümelerini hızlı ve etkili bir şekilde göstermek için optimize edilmiştir.

- moment (^2.30.1): Tarih ve saat manipülasyonları için kullanılan bir kütüphanedir. Tarihleri analiz etmek, biçimlendirmek ve işlemek için kullanılır.


