# Краткое пособие по Routing в Angular

#### _автор: Кудрин Максим, почта: maxim.kudrin@gmail.com_

## Что такое Роутинг?

Это возможность осуществлять навигацию по приложению

## Структура MindCard

1. Зарегистрировать роуты
2. Динамическая смена страниц используя routerLink
3. Активная ссылка routerLinkActive, routerLinkActiveOptions
4. Програмная навигация, Router
5. Динамические роуты
6. Обработка параметров

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

### 6. Обработка параметров

> - в конструктор поста передаем `route:ActivatedRoute`, у которого есть `params` (это стрим), подписываемся на него и в колбеке получаем параметры из строки роута, данные с типом `Params`, id будет **строкой**!
> - дальше в конструктор передаем `postsService: PostsService`, у которого есть метод `getPostById()`
> - дальше выполняем програмную навигацию используя `router: Router`, метод `navigate`
> - данные из `this.post` передаем через _интерполяцию_ в шаблон

```
export class PostComponent implements OnInit{
    post:Post
    constructor(
        private route:ActivatedRoute,
        private postsServices:PostsServices,
        private router: Router){}
    ngOnInit(){
        this.route.params.subscribe((params:Params)=>{
            this.post = this.postsServices.getById(+params.id)
        })
    }

    //Повторение программной навигации

    goToPostFour(){
        this.router.navigate(['/posts', 44])
    }
}
```

### 7. Работа с параметрами

> - есть два способа отправить параметры: программно и из шаблона

из шаблона результат будет `/posts?param=value#fragm`:

```
<button
    routerLink="posts"
    [queryParams]="{param:"value"}"
    fragment="fragm"
>Send params
</button>
```

программно результат будет `/posts?hello=world#qq`:

```
sendHandler(router:Router){
    router.navigate(['/posts'],
    {queryParams:{hello:"world"}, fragment: 'qq'})
}
```

получить `параметры` и `фрагмент` можно так:

```
constructor(privat route:ActivatedRoute)
ngOnInit(){
    this.route.queryParams.subscribe((params:Params)=>{
        console.log(params)
    })
    this.route.fragment.subscribe((fragment)=>{
        console.log(fragment)
    })
}
```
