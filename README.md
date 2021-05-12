# Краткое пособие по Routing в Angular

#### _автор: Кудрин Максим, почта: maxim.kudrin@gmail.com_

## Что такое Роутинг?

Это возможность осуществлять навигацию по приложению

## Структура MindCard

1. Зарегистрировать роуты
2.
3.
4.
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
