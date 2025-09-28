src/
│── components/
│ ├── WidgetWithClassMediator/
│ │ ├── WidgetWithClassMediator.tsx # Компонент-виджет
│ │ └── index.ts # реэкспорт
│ └── App.tsx # Главный компонент приложения
│
│── core/
│ ├── mediator/
│ │ ├── Mediator.ts # Класс Mediator
│ │ ├── events.ts # Типы событий/интерфейсов
│ │ └── index.ts # реэкспорт
│
│── styles/
│ └── global.css # стили
│
│── main.tsx # входная точка React (createRoot)
│── vite-env.d.ts # если Vite
│── tsconfig.json
│── package.json
