# Краткое пособие по Routing в Angular

#### _автор: Кудрин Максим, почта: maxim.kudrin@gmail.com_

## Что такое Роутинг?

Это возможность осуществлять навигацию по приложению

## Структура MindCard

1. Зарегистрировать роуты
2. Динамическая смена страниц используя routerLink
3. Активная ссылка routerLinkActive, routerLinkActiveOptions
4. Програмная навигация, Router
5.
6.

## Развернутые ответы

### 1. Зарегистрировать роуты

> - в корне src/app создаем файл `app-routing.module.ts`
> - импорты подтягиваю автоматически
> - важно не писать `"/"` в пути
> - важно зарегистрировать в импортах `app.module.ts`
> - для отображения используем `<router-outlet>`

```

const routes:Routes = [
    {path: "", component: "YourComponent"},
    {path: "About", component: "AboutComponent"},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule
```

### 2. Динамическая смена страниц используя routerLink

> - использую вместо `href` директиву `routerLink`
> - тут `"/"` используем обязательно
> - записи ниже - эквивалентные, 2я используется для binding'a, а `массив соединяет элемаенты в строку`

```
<a routerLink="/page">Страница</a>
=
<a [routerLink]="['/','page']">Страница</a>
```

### 3. Активная ссылка `routerLinkActive`, `routerLinkActiveOptions`

> - в директиву routerLinkActive передаем название класса, если путь в браузере совпадает с путем в routerLink, то элементу присваивается класс.
> - routerLinkActive можно передать родительскому элементу, как в примере ниже.
> - `[routerLinkActiveOptions]="{exact:true}"`, если не хотим чтобы `родительский путь` был всегда с классом активного элемента
> - routerLinkActive надо передавать во все элементы навигации

```
<li routerLinkActive="activeClassName">
    <a [routerLink]="['/','page']">Страница</a>
</li>
```

### 4. Програмная навигация, `Router`

> - создаем метод обработки события `clickHandler`
> - в конструктор класса с методом выше передаем `private router:Router`, тут авто assign из-за TypeScript
> - в методе обработчика вызываем метод у `router`'a `navigate`
> - `['/','home']` = `['/home']`

```
export class TestComponent{
    constructor(public router:Router)
    clickHandler(){
        this.router.navigate(['/','home'])
    }
}
```

### 5. Динамические роуты

> - специальным образом регистрируем роут с динамикой, пример ниже.
> - выводим ссылки с роутами из массива, например, при выводе из массива через директиву `*ngFor="let item of items"`
> - `<a roterLink=['/',str]>`, динамика в `str`

регистрация роута в модуле, `:id` можно название любое

```
routes:Routes = [
    {path: 'posts/:id', component: PostComponent}
]
```

динамический вывод из массива

```
<a *ngFor="let item of items" [routerLink]="['/posts',item.id]">
    {{item.name}}
</a>
```
