# Инструкция по созданию каталога и выдаче прав в Yandex Cloud

Этот документ содержит пошаговую инструкцию по созданию каталога в Yandex Cloud и выдаче прав на него пользователю или сервисному аккаунту.

## 1. Создание каталога в Yandex Cloud

### Через веб-консоль:
1. Перейдите в [Yandex Cloud Console](https://console.cloud.yandex.ru/).
2. В левом меню выберите **"Каталоги"**.
3. Нажмите **"Создать каталог"**.
4. Введите название каталога и нажмите **"Создать"**.

### Через CLI:
Выполните команду:
```sh
yc resource-manager folder create --name my-folder
```
Где `my-folder` — название создаваемого каталога.

## 2. Выдача прав на каталог

### Через веб-консоль:
1. Перейдите в **Yandex Cloud Console**.
2. В меню выберите **"Каталоги"** → **"Ваш каталог"**.
3. Откройте вкладку **"Доступ"**.
4. Нажмите **"Добавить роль"**.
5. В поле **"Субъект"** выберите пользователя или сервисный аккаунт.
6. В поле **"Роль"** выберите **"Администратор каталога"** (`resource-manager.folder.admin`).
7. Нажмите **"Сохранить"**.

### Через CLI:
Выдайте права пользователю:
```sh
yc resource-manager folder add-access-binding my-folder \
  --role resource-manager.folder.admin \
  --subject userAccount:user-id
```

Если нужно дать доступ сервисному аккаунту:
```sh
yc resource-manager folder add-access-binding my-folder \
  --role resource-manager.folder.admin \
  --subject serviceAccount:sa-id
```
Где `user-id` — ID пользователя, а `sa-id` — идентификатор сервисного аккаунта.

## 3. Проверка прав
Чтобы убедиться, что доступ предоставлен правильно, выполните команду:
```sh
yc resource-manager folder list-access-bindings my-folder
```
