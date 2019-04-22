# Множественные рендереры
В данной библиотеке использется техника изоляции частей программы путём создания отдельных рендереров виртуального DOM.
При присоединении к реальному DOM некоторые виджеты создают отдельный рендерер, с помощью которого и отрисовывают своих 
детей. 

На практике это выглядит следующим образом:
```typescript
export default class Widget extends WidgetBase<WidgetProps> {
    protected render(): DNode {
        return v('div', {id: 'inner'});// нода, на которую будет закреплён дополнительный рендерер
         
    }

    onAttach() { // этот метод будет вызван срау после присоединения виджета к реальному DOM
        const innerRenderer = renderer(() => w(InnerWidget, {key: 'innerWidget'}));// отдельный рендерер для виджета-ребёнка
        const innerRegistry = new Registry(); // отдельный registry для детей
        innerRegistry.defineInjector('appContext', (invalidator: () => void) => {
            const context = new InnerContext(invalidator, initialState);
            return () => context;
        });
        innerRenderer.mount( // присоединяем новое дерево VDOM к ноде, которую ранее отрисовал виджет
            {
                registry: innerRegistry,
                domNode: document.getElementById('inner') as HTMLElement,
            }
        ); 
        // теперь все виджеты-дети InnerWidget могут использовать данные именно из appContext, обьявленного выше
    }
}
```

Для создания подобных структур существует функция [createComponentWithOwnRenderer](/src/common/ComponentWithOwnRenderer.ts).
 Она создаёт новый рендерер VDOM для виджета, который был передан, используя тот контекст, который был передан вторым 
 параметром. 
 
     Важно: Все внуренние контексты в рендерерах регистрируются под именем 'ownContext'. Именно это имя должны использовать контейнеры.
 
 На практике это выглядит так:
```typescript
export default class MyWidget extends WidgetBase<MyWidgetProps> {
    
	private isStarted: boolean;
    private context: SomeContext;

    protected render(): DNode {
        if(!this.isStarted) { // создаём контекст при рендеринге для того, чтобы в него можно было передать данные через properties
            this.isStarted = true;
            this.context =  new SomeContext();
        }
        // создаём прокси виджет, который берёт на себя создание рендерера
        // вместо виджета можно передать контейнер с виджетом
        // для корректной работы контейнер должен доставать иньектор по имени 'ownContext'
        const processedWidget = createComponentWithOwnRenderer(InnerWidgetContainer, this.context); 
        return v('div',
            {
                styles: {
                    padding: '8px',
                    margin: '8px',
                    border: '3px solid blue'
                }
            },
            [
                v('button',
                    {
                        onclick: () => {
                            this.properties.onIncrementCount()
                        }
                    },
                    ['increment value']
                ),
                String(this.properties.count), // рендерим собственные данные виджета
                w(processedWidget, {}) // размещаем виджет с рендерером
            ]
        );
    }
}
``` 

Все внуренние контексты в рендерерах регистрируются под именем ownContext. Именно это имя должны использовать контейнеры.
