import { DefaultKeyboardEventHandler, DefaultModeOptions, MindmapOptions } from "@attonex-private/mindmap";

export function createMindmapOption(container: string): MindmapOptions {
    const mindmapOption = MindmapOptions.Default;
    mindmapOption.container = container;
    mindmapOption.modes = {
        default: {
            behaviors: [
                DefaultModeOptions.CollapseExpandModeOption,
                "drag-canvas",
                "zoom-canvas",
                "attonex-highlight",
                "attonex-click-select",
                "attonex-collapse-expand",
            ]
        },
        edit: {
            behaviors: [
                DefaultModeOptions.CollapseExpandModeOption,
                "drag-canvas",
                "zoom-canvas",
                "attonex-highlight",
                "attonex-click-select",
                "drag-node",
                "attonex-drag-node",
                "attonex-collapse-expand",
            ],
            keyboardEvents: [{
                key: "Tab",
                handler: DefaultKeyboardEventHandler.AddDescendant
            }, {
                key: "Enter",
                handler: DefaultKeyboardEventHandler.AddSibling
            }, {
                key: "ArrowUp",
                modifiers: [ "CTRL" ],
                handler: DefaultKeyboardEventHandler.MoveUp
            }, {
                key: "ArrowDown",
                modifiers: [ "CTRL" ],
                handler: DefaultKeyboardEventHandler.MoveDown
            }, {
                key: "Backspace",
                handler: DefaultKeyboardEventHandler.Remove
            }, {
                key: "Delete",
                handler: DefaultKeyboardEventHandler.Remove
            }, {
                key: "ArrowUp",
                handler: DefaultKeyboardEventHandler.SelectBeforeSibling
            }, {
                key: "ArrowDown",
                handler: DefaultKeyboardEventHandler.SelectAfterSibling
            }, {
                key: "ArrowLeft",
                handler: DefaultKeyboardEventHandler.SelectParent
            }, {
                key: "ArrowRight",
                handler: DefaultKeyboardEventHandler.SelectFirstChild
            }]
        }
    }
    return mindmapOption;
}
