<template>
    <div>
        <div class="tree-container">

            <v-jstree ref="release"
                      :data="data"
                      draggable
                      execute-sibling-movement
                      @item-click="itemClick"
                      :item-events="itemEvents"
                      text-field-name="text"
                      v-on:item-drop-before="itemDropBefore"
                      v-on:item-drag-start="itemDragStart"
                      v-on:item-drop="itemDrop"
                      v-on:item-drop-sibling-left="itemDrop"
                      v-on:item-drop-sibling-right="itemDrop"
            ></v-jstree>

        </div>
        <vue-context ref="menu">
            <li><a href="" @click.prevent="tree.action.new">New</a></li>
            <li><a href="" @click.prevent="tree.action.cut">Cut</a></li>
            <li><a href="" @click.prevent="tree.action.copy">Copy</a></li>
            <li><a href="" @click.prevent="tree.action.paste" :class="{'paste-disabled' : !tree.canPaste()}">Paste</a></li>
            <li><a href="" @click.prevent="tree.action.remove">Delete</a></li>
        </vue-context>
    </div>
</template>
<script>

    import { ref } from '@vue/composition-api';
    import { VueContext } from 'vue-context';
    import { VJstree, useTreeActions, useMultiTree} from 'vue-jstree-extended'

    export default {

        setup() {

            const editingNode = ref(null);

            const { action, canPaste } = useTreeActions(editingNode);

            function setEditingNode(value) {
                editingNode.value = value
            }

            return {
                multiTree : useMultiTree(),
                "tree" : {
                    editingNode,
                    canPaste,
                    action,
                    setEditingNode
                },
            }
        },
        components: {
            VJstree,
            VueContext
        },
        data() {
            var vm = this;
            return {
                itemEvents: {
                    mouseover: function () {
                        console.log('mouseover')
                    },
                    contextmenu: function (node,model,event) {
                        console.log(arguments[2])
                        arguments[2].preventDefault() // disable default right click menu
                        console.log('contextmenu')
                        node.model.select();
                        // Mark active node
                        vm.tree.setEditingNode(node);
                        // Open the menu
                        vm.$refs.menu.open(event,model);
                    }
                },
                data: [
                    {
                        "text": "Same but with checkboxes",
                        "children": [
                            {
                                "text": "initially checked",
                                "checked": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "Same but with checkboxes",
                        "opened": true,
                        "children": [
                            {
                                "text": "initially checked",
                                "checked": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "And wholerow selection"
                    },
                    {
                        "text": "drag disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "draggable": false
                    },
                    {
                        "text": "drop disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "drop": false
                    }
                ],
            }
        },
        methods: {
            onClickInMenu(txt) {
                console.log('You clicked: ' + txt);
            },
            itemClick(node) {
                this.tree.setEditingNode(node);
                console.log(node.model.text + ' clicked !')
            },
            itemChecked(node) {
                console.log(node.model.text + ' check toggled !')
            },
            itemDragStart(node) {
                console.log(node.model.text + ' drag start !')
            },
            itemDragEnd(node) {
                console.log(node.model.text + ' drag end !')
            },
            itemDropBefore(node) {
                console.log(node.model.text + ' drag before !')
            },
            itemDrop(node) {
                console.log(node.model.text + ' drag drop !')

            },
            customItemClick: function () {

            },
            customItemClickWithCtrl: function () {
                console.log('click + ctrl')
            },

        }
    }
</script>