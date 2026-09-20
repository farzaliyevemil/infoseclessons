---
id: http-methods-and-status-codes
title: HTTP metodları və status kodları
description: HTTP sorğu metodlarını, cavab status kodlarını, əsas kodları və web təhlükəsizliyində mənalarını izah edən təməl dərs.
slug: /networking/http-methods-and-status-codes
sidebar_position: 12
status: reference
last_reviewed: 2026-09-20
keywords:
  - http
  - http methods
  - status codes
  - get
  - post
  - put
  - patch
  - web security
difficulty: foundation

tags:
  - networking
  - beginner
---

# HTTP metodları və status kodları

HTTP brauzerlərin, API-lərin və veb xidmətlərin istifadə etdiyi tətbiq səviyyəli protokoldur. Klient **sorğu**, server isə **cavab** göndərir. Sorğu metodu nəzərdə tutulan əməliyyatı, cavab status kodu isə nəticəni ümumiləşdirir.

## Sorğunun quruluşu

```http
GET /products/42 HTTP/1.1
Host: shop.example
Accept: application/json
```

HTTP sorğusunda adətən metod, yol, protokol versiyası, header-lər və bəzən body olur. Cavab status sətri, header-lər və bəzən body-dən ibarətdir:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":42,"name":"Keyboard"}
```

HTTPS TLS ilə qorunan HTTP-dir. TLS əlaqəni qoruyur, lakin təhlükəli tətbiqi və ya həddindən artıq səlahiyyətli hesabı təhlükəsiz etmir.

## Əsas HTTP metodları

| Metod | Məqsəd | Safe və ya idempotent? | Tipik təhlükəsizlik sualı |
|---|---|---|---|
| **GET** | Resursu almaq | Safe və idempotent | İcazəsiz data göstərilirmi? |
| **POST** | Resurs yaratmaq və ya əməliyyat başlatmaq | Varsayılan olaraq heç biri | CSRF qoruması və input validation varmı? |
| **PUT** | Resursu tam əvəz etmək | Idempotent | İstifadəçi başqasının obyektini əvəz edə bilərmi? |
| **PATCH** | Resursun bir hissəsini dəyişmək | Mütləq deyil | Məhdud sahələr mass assignment-dan qorunurmu? |
| **DELETE** | Resursu silmək | Tərifə görə idempotent, tətbiqdən asılıdır | Silməyə icazə və bərpa imkanı varmı? |
| **HEAD** | GET kimi header-ləri qaytarmaq, body qaytarmamaq | Safe və idempotent | Faydalı metadata sızırmı? |
| **OPTIONS** | Dəstəklənən metod və imkanları göstərmək | Safe və idempotent | CORS həddindən artıq açıqdırmı? |
| **CONNECT** | Əsasən proxy üzərindən tunel yaratmaq | Sadə API-lərdə istifadə olunmur | Proxy açıq tunel kimi sui-istifadə oluna bilərmi? |
| **TRACE** | Diaqnostika üçün sorğunu əks etdirmək | Safe, lakin adətən söndürülür | Header-lərin sızmasına kömək edə bilərmi? |

**Safe** server vəziyyətini dəyişməməli olan metod deməkdir. **Idempotent** eyni sorğunu təkrar göndərdikdə nəzərdə tutulan nəticənin bir dəfə göndərməklə eyni olmasıdır. Bunlar protokol semantikasıdır, tətbiqin zərərsiz olduğuna zəmanət deyil.

## Status kod sinifləri

| Sinif | Mənası | Nümunə |
|---|---|---|
| **1xx** | Məlumatlandırıcı; sorğu işlənir | `100 Continue` |
| **2xx** | Sorğu uğurludur | `200 OK` |
| **3xx** | Yönləndirmə və ya cache nəticəsi | `301 Moved Permanently` |
| **4xx** | Klient sorğusu səhv, icazəsiz və ya autentifikasiyasızdır | `404 Not Found` |
| **5xx** | Server və ya upstream xidmət uğursuz oldu | `500 Internal Server Error` |

## Əzbərlənməli kodlar

| Kod | Mənası | Praktik izah |
|---|---|---|
| `200 OK` | Uğurlu sorğu | Resurs qaytarıldı və ya əməliyyat tamamlandı |
| `201 Created` | Resurs yaradıldı | Uğurlu POST-dan sonra yayğındır |
| `202 Accepted` | Sonrakı emal üçün qəbul edildi | İş hələ davam edə bilər |
| `204 No Content` | Body olmadan uğur | DELETE və ya update-dən sonra yayğındır |
| `301 Moved Permanently` | Daimi yönləndirmə | Link və cache-ləri diqqətlə yeniləyin |
| `302 Found` | Praktikada müvəqqəti yönləndirmə | Klientin hara göndərildiyini yoxlayın |
| `304 Not Modified` | Cache-dəki versiya hələ keçərlidir | Yeni body göndərilmədi |
| `400 Bad Request` | Səhv və ya yararsız sorğu | Sintaksis, validation və ya parsing problemi |
| `401 Unauthorized` | Autentifikasiya yoxdur və ya səhvdir | Klient autentifikasiya olmalıdır; bu “authenticated, amma qadağandır” demək deyil |
| `403 Forbidden` | Server başa düşdü, lakin girişi rədd edir | Autentifikasiya ola bilər, icazə kifayət etmir |
| `404 Not Found` | Resurs tapılmadı və ya qəsdən gizlədildi | API-lər obyektin mövcudluğunu təsdiqləməmək üçün istifadə edə bilər |
| `405 Method Not Allowed` | Bu resurs üçün metod dəstəklənmir | `Allow` header-i icazəli metodları göstərə bilər |
| `409 Conflict` | Sorğu cari vəziyyətlə ziddiyyət təşkil edir | Təkrar resurs və ya versiya konflikti |
| `429 Too Many Requests` | Rate limit aşıldı | Serverin göstərdiyi müddətdən sonra təkrar yoxlayın |
| `500 Internal Server Error` | Gözlənilməz server xətası | Stack trace klientə verilməməlidir |
| `502 Bad Gateway` | Proxy upstream-dən səhv cavab aldı | Reverse proxy və backend-i yoxlayın |
| `503 Service Unavailable` | Server müvəqqəti xidmət göstərə bilmir | Baxım, yüklənmə və ya dependency problemi |
| `504 Gateway Timeout` | Upstream vaxtında cavab vermədi | Gecikmə və dependency sağlamlığını araşdırın |

## Təhlükəsizlik baxışı

HTTP bilikləri tətbiqi həm hücumçu, həm də müdafiəçi baxışı ilə anlamağa kömək edir:

- Təkcə endpoint-in `200` qaytarmasına deyil, hər obyekt üzrə authorization-a baxın.
- `401`, `403` və `404` fərqli siqnallardır; yalnız status koduna əsasən nəzarətin işlədiyini düşünməyin.
- Həssas məlumatın URL-də, loglarda, referrer header-də və error mesajlarında görünmədiyini yoxlayın.
- Method məhdudiyyətlərini test edin: endpoint `GET`-i bloklasa da, `PUT`, `PATCH` və ya `DELETE` səhv işləyə bilər.
- Error cavabları operator üçün faydalı, lakin stack trace, secret, framework versiyası və daxili yol açıqlamayacaq şəkildə olmalıdır.
- CORS-u məqsədli konfiqurasiya edin; `Access-Control-Allow-Origin: *` hər authenticated tətbiq üçün uyğun deyil.
- Authentication və bahalı endpoint-lər üçün rate limit tətbiq edin, qeyri-adi metod və status nümunələrini loglayın.

## Sürətli troubleshooting

Sorğu uğursuz olduqda əvvəl metod və yolu, sonra autentifikasiya, authorization, header-lər, body validation, server və upstream loglarını yoxlayın. `404` səhv yol demək ola bilər; `405` adətən yolun mövcud olduğunu, lakin metodun qəbul edilmədiyini göstərir. `502` və `504` çox vaxt klientdən kənarda, proxy və ya backend dependency-də problem olduğunu göstərir.

## İmtahan xülasəsi

- Metod = nəzərdə tutulan əməliyyat; status kodu = nəticə sinfi.
- `401` autentifikasiya tələb olunur və ya uğursuzdur; `403` giriş rədd edilir.
- `PUT` adətən resursu tam əvəz edir; `PATCH` qismən dəyişir.
- `GET`, `HEAD` və `OPTIONS` dizayna görə safe-dir; tətbiq yenə də məlumat sızdıra bilər.
- `2xx` uğur, `3xx` yönləndirmə/cache, `4xx` klient problemi, `5xx` server problemidir.
