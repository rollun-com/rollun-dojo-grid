# Множественные рендереры
В данной библиотеке использется техника изоляции частей программы путм создания отдельных рендереров виртуального DOM.
При присоединении к реальному DOM некоторые виджеты создают отдельный рендерер, с помощью которого и отрисовывают своих 
детей. 

На практике это выглядит следующим образом:
```typescript
export default class WidgetApp extends WidgetBase<WidgetAppProps> {
    protected render(): DNode {
        return v('div', {id: 'inner'});// нода, на которую будет закреплён дополнительный рендерер
         
    }

    onAttach() { // этот метод будет вызван срау после присоединения виджета к реальному DOM
        const innerRenderer = renderer(() => w(InnerWidget, {key: 'innerWidget'}));// отдельный рендрер для виджета-ребёнка
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
        // тепер все виджеты-дети InnerWidget могут использовать данные именно из appContext, обьявленного выше
    }
}
```
