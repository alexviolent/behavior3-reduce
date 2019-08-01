// TypeScript file

declare namespace b3 {
    /**
     * Version of the library.
     * 
     * @property VERSION
     * @type {String}
     */
    var VERSION: string;

    /**
     * Returned when a criterion has been met by a condition node or an action node
     * has been completed successfully.
     * 
     * @property SUCCESS
     * @type {Integer}
     */
    var SUCCESS: number;

    /**
     * Returned when a criterion has not been met by a condition node or an action 
     * node could not finish its execution for any reason.
     * 
     * @property FAILURE
     * @type {Integer}
     */
    var FAILURE: number;

    /**
     * Returned when an action node has been initialized but is still waiting the 
     * its resolution.
     * 
     * @property FAILURE
     * @type {Integer}
     */
    var RUNNING: number;

    /**
     * Returned when some unexpected error happened in the tree, probably by a 
     * programming error (trying to verify an undefined variable). Its use depends 
     * on the final implementation of the leaf nodes.
     * 
     * @property ERROR
     * @type {Integer}
     */
    var ERROR: number;


    /**
     * Describes the node category as Composite.
     * 
     * @property COMPOSITE
     * @type {String}
     */
    var COMPOSITE: string;

    /**
     * Describes the node category as Decorator.
     * 
     * @property DECORATOR
     * @type {String}
     */
    var DECORATOR: string;

    /**
     * Describes the node category as Action.
     * 
     * @property ACTION
     * @type {String}
     */
    var ACTION: string;

    /**
     * Describes the node category as Condition.
     * 
     * @property CONDITION
     * @type {String}
     */
    var CONDITION: string;

    /**
     * The BehaviorTree class, as the name implies, represents the Behavior Tree 
     * structure.
     * 
     * There are two ways to construct a Behavior Tree: by manually setting the 
     * root node, or by loading it from a data structure (which can be loaded from 
     * a JSON). Both methods are shown in the examples below and better explained 
     * in the user guide.
     *
     * The tick method must be called periodically, in order to send the tick 
     * signal to all nodes in the tree, starting from the root. The method 
     * `BehaviorTree.tick` receives a target object and a blackboard as parameters.
     * The target object can be anything: a game agent, a system, a DOM object, 
     * etc. This target is not used by any piece of Behavior3JS, i.e., the target
     * object will only be used by custom nodes.
     * 
     * The blackboard is obligatory and must be an instance of `Blackboard`. This 
     * requirement is necessary due to the fact that neither `BehaviorTree` or any 
     * node will store the execution variables in its own object (e.g., the BT does
     * not store the target, information about opened nodes or number of times the 
     * tree was called). But because of this, you only need a single tree instance 
     * to control multiple (maybe hundreds) objects.
     * 
     * Manual construction of a Behavior Tree
     * --------------------------------------
     * 
     *     var tree = new b3.BehaviorTree();
     *  
     *     tree.root = new b3.Sequence({children:[
     *         new b3.Priority({children:[
     *             new MyCustomNode(),
     *             new MyCustomNode()
     *         ]}),
     *         ...
     *     ]});
     *     
     * 
     * Loading a Behavior Tree from data structure
     * -------------------------------------------
     * 
     *     var tree = new b3.BehaviorTree();
     *
     *     tree.load({
     *         'title'       : 'Behavior Tree title'
     *         'description' : 'My description'
     *         'root'        : 'node-id-1'
     *         'nodes'       : {
     *             'node-id-1' : {
     *                 'name'        : 'Priority', // this is the node type
     *                 'title'       : 'Root Node', 
     *                 'description' : 'Description', 
     *                 'children'    : ['node-id-2', 'node-id-3'], 
     *             },
     *             ...
     *         }
     *     })
     *     
     *
     * @class BehaviorTree
    **/
    class BehaviorTree {
        /**
         * Initialization method.
         *
         * @method initialize
         * @constructor
        **/
        initialize();

        /**
         * This method loads a Behavior Tree from a data structure, populating this
         * object with the provided data. Notice that, the data structure must 
         * follow the format specified by Behavior3JS. Consult the guide to know 
         * more about this format.
         *
         * You probably want to use custom nodes in your BTs, thus, you need to 
         * provide the `names` object, in which this method can find the nodes by 
         * `names[NODE_NAME]`. This variable can be a namespace or a dictionary, 
         * as long as this method can find the node by its name, for example:
         *
         *     //json
         *     ...
         *     'node1': {
         *       'name': MyCustomNode,
         *       'title': ...
         *     }
         *     ...
         *     
         *     //code
         *     var bt = new b3.BehaviorTree();
         *     bt.load(data, {'MyCustomNode':MyCustomNode})
         *     
         * 
         * @method load
         * @param {Object} data The data structure representing a Behavior Tree.
         * @param {Object} [names] A namespace or dict containing custom nodes.
        **/
        load(data: any, names?: any[]);

        /**
         * This method dump the current BT into a data structure.
         *
         * Note: This method does not record the current node parameters. Thus, 
         * it may not be compatible with load for now.
         * 
         * @method dump
         * @returns {Object} A data object representing this tree.
        **/
        dump();

        /**
         * Propagates the tick signal through the tree, starting from the root.
         * 
         * This method receives a target object of any type (Object, Array, 
         * DOMElement, whatever) and a `Blackboard` instance. The target object has
         * no use at all for all Behavior3JS components, but surely is important 
         * for custom nodes. The blackboard instance is used by the tree and nodes 
         * to store execution variables (e.g., last node running) and is obligatory
         * to be a `Blackboard` instance (or an object with the same interface).
         * 
         * Internally, this method creates a Tick object, which will store the 
         * target and the blackboard objects.
         * 
         * Note: BehaviorTree stores a list of open nodes from last tick, if these 
         * nodes weren't called after the current tick, this method will close them 
         * automatically.
         * 
         * @method tick
         * @param {Object} target A target object.
         * @param {Blackboard} blackboard An instance of blackboard object.
         * @returns {Constant} The tick signal state.
        **/
        tick(target, blackboard): number;
    }

    /**
     * Class is a meta-factory function to create classes in JavaScript. It is a
     * shortcut for the CreateJS syntax style. By default, the class created by 
     * this function have an initialize function (the constructor). Optionally, you
     * can specify the inheritance by passing another class as parameter.
     *
     * By default, all classes created using this function, may receives only a
     * settings parameter as argument. This pattern is commonly used by jQuery and 
     * its plugins.
     *
     * Usage
     * -----
     *
     *     // Creating a simple class
     *     var BaseClass = b3.Class();
     *
     *     // Using inheritance
     *     var ChildClass = b3.Class(BaseClass);
     *
     *     // Defining the constructor
     *     ChildClass.prototype.initialize = function(settings) { ... }
     *
     * @method Class
     * @param {Object} [baseClass] The super class.
     * @return {Object} A new class.
    **/
    function Class(baseClass);

    /**
     * The Blackboard is the memory structure required by `BehaviorTree` and its 
     * nodes. It only have 2 public methods: `set` and `get`. These methods works 
     * in 3 different contexts: global, per tree, and per node per tree.
     * 
     * Suppose you have two different trees controlling a single object with a 
     * single blackboard, then:
     *
     * - In the global context, all nodes will access the stored information. 
     * - In per tree context, only nodes sharing the same tree share the stored 
     *   information.
     * - In per node per tree context, the information stored in the blackboard can
     *   only be accessed by the same node that wrote the data.
     *   
     * The context is selected indirectly by the parameters provided to these 
     * methods, for example:
     * 
     *     // getting/setting variable in global context
     *     blackboard.set('testKey', 'value');
     *     var value = blackboard.get('testKey');
     *     
     *     // getting/setting variable in per tree context
     *     blackboard.set('testKey', 'value', tree.id);
     *     var value = blackboard.get('testKey', tree.id);
     *     
     *     // getting/setting variable in per node per tree context
     *     blackboard.set('testKey', 'value', tree.id, node.id);
     *     var value = blackboard.get('testKey', tree.id, node.id);
     * 
     * Note: Internally, the blackboard store these memories in different objects,
     *  being the global on `_baseMemory`, the per tree on `_treeMemory` and the 
     *  per node per tree dynamically create inside the per tree memory (it is 
     *  accessed via `_treeMemory[id].nodeMemory`). Avoid to use these variables 
     *  manually, use `get` and `set` instead.
     *  
     * @class Blackboard
    **/
    class Blackboard {
        /**
         * Initialization method.
         *
         * @method initialize
         * @constructor
        **/
        initialize(): void;

        /**
         * Stores a value in the blackboard. If treeScope and nodeScope are 
         * provided, this method will save the value into the per node per tree 
         * memory. If only the treeScope is provided, it will save the value into 
         * the per tree memory. If no parameter is provided, this method will save 
         * the value into the global memory. Notice that, if only nodeScope is 
         * provided (but treeScope not), this method will still save the value into
         * the global memory.
         *
         * @method set
         * @param {String} key The key to be stored.
         * @param {any} value The value to be stored.
         * @param {String} treeScope The tree id if accessing the tree or node 
         *                           memory.
         * @param {String} nodeScope The node id if accessing the node memory.
        **/
        set(key: string, value: any, treeScope?: string, nodeScope?: string);

        /**
         * Retrieves a value in the blackboard. If treeScope and nodeScope are
         * provided, this method will retrieve the value from the per node per tree
         * memory. If only the treeScope is provided, it will retrieve the value
         * from the per tree memory. If no parameter is provided, this method will
         * retrieve from the global memory. If only nodeScope is provided (but
         * treeScope not), this method will still try to retrieve from the global
         * memory.
         *
         * @method get
         * @param {String} key The key to be retrieved.
         * @param {String} treeScope The tree id if accessing the tree or node 
         *                           memory.
         * @param {String} nodeScope The node id if accessing the node memory.
         * @returns {any} The value stored or undefined.
        **/
        get(key: string, treeScope?: string, nodeScope?: string): any;
    }

    /**
 * A new Tick object is instantiated every tick by BehaviorTree. It is passed 
 * as parameter to the nodes through the tree during the traversal.
 * 
 * The role of the Tick class is to store the instances of tree, debug, target
 * and blackboard. So, all nodes can access these informations.
 * 
 * For internal uses, the Tick also is useful to store the open node after the 
 * tick signal, in order to let `BehaviorTree` to keep track and close them 
 * when necessary.
 *
 * This class also makes a bridge between nodes and the debug, passing the node
 * state to the debug if the last is provided.
 *
 * @class Tick
**/
    class Tick {

        /**
         * The tree reference.
         * 
         * @property tree
         * @type {b3.BehaviorTree}
         * @readOnly
         */
        readonly tree: BehaviorTree;
        
        /**
         * The debug reference.
         * 
         * @property debug
         * @type {Object}
         * @readOnly
         */
        readonly debug: Object;
        
        /**
         * The target object reference.
         * 
         * @property target
         * @type {Object}
         * @readOnly
         */
        readonly target: Object;
        
        /**
         * The blackboard reference.
         * 
         * @property blackboard
         * @type {Blackboard}
         * @readOnly
         */
        readonly blackboard: Blackboard;
        
        /**
         * The list of open nodes. Update during the tree traversal.
         * 
         * @property _openNodes
         * @type {Array}
         * @protected
         * @readOnly
         */
        protected readonly _openNodes: Array<any>;
        
        /**
         * The number of nodes entered during the tick. Update during the tree 
         * traversal.
         * 
         * @property _nodeCount
         * @type {Integer}
         * @protected
         * @readOnly
         */
        protected readonly _nodeCount: number;

        /**
         * Initialization method.
         *
         * @method initialize
         * @constructor
        **/
        initialize(): void;

        /**
         * Called when entering a node (called by BaseNode).
         *
         * @method _enterNode
         * @param {Object} node The node that called this method.
         * @protected
        **/
        protected _enterNode(node: Object): void;

        /**
         * Callback when opening a node (called by BaseNode). 
         *
         * @method _openNode
         * @param {Object} node The node that called this method.
         * @protected
        **/
        protected _openNode(node: Object): void;

        /**
         * Callback when ticking a node (called by BaseNode).
         *
         * @method _tickNode
         * @param {Object} node The node that called this method.
         * @protected
        **/
        protected _tickNode(node: Object): void;

        /**
         * Callback when closing a node (called by BaseNode).
         *
         * @method _closeNode
         * @param {Object} node The node that called this method.
         * @protected
        **/
        protected _closeNode(node: Object): void;

        /**
         * Callback when exiting a node (called by BaseNode).
         *
         * @method _exitNode
         * @param {Object} node The node that called this method.
         * @protected
        **/
        protected _exitNode(node: Object): void;

    }

    /**
 * The BaseNode class is used as super class to all nodes in BehaviorJS. It 
 * comprises all common variables and methods that a node must have to execute.
 *
 * **IMPORTANT:** Do not inherit from this class, use `b3.Composite`, 
 * `b3.Decorator`, `b3.Action` or `b3.Condition`, instead.
 *
 * The attributes are specially designed to serialization of the node in a JSON
 * format. In special, the `parameters` attribute can be set into the visual 
 * editor (thus, in the JSON file), and it will be used as parameter on the 
 * node initialization at `BehaviorTree.load`.
 * 
 * BaseNode also provide 5 callback methods, which the node implementations can
 * override. They are `enter`, `open`, `tick`, `close` and `exit`. See their 
 * documentation to know more. These callbacks are called inside the `_execute`
 * method, which is called in the tree traversal.
 * 
 * @class BaseNode
**/
    class BaseNode {

        /**
         * Node ID.
         *
         * @property id
         * @type {String}
         * @readonly
        **/
        id: string;

        /**
         * Node name. Must be a unique identifier, preferable the same name of the 
         * class. You have to set the node name in the prototype.
         *
         * @property name
         * @type {String}
         * @readonly
        **/
        readonly name: string;

        /**
         * Node category. Must be `b3.COMPOSITE`, `b3.DECORATOR`, `b3.ACTION` or 
         * `b3.CONDITION`. This is defined automatically be inheriting the 
         * correspondent class.
         *
         * @property category
         * @type constant
         * @readonly
        **/
        readonly category: number;

        /**
         * Node title.
         *
         * @property title
         * @type {String}
         * @optional
         * @readonly
        **/
        readonly title: string;

        /**
         * Node description.
         *
         * @property description
         * @type {String}
         * @optional
         * @readonly
        **/
        readonly description: string;

        /**
         * A dictionary (key, value) describing the node parameters. Useful for 
         * defining parameter values in the visual editor. Note: this is only 
         * useful for nodes when loading trees from JSON files.
         *
         * @property parameters
         * @type {Object}
         * @readonly
        **/
        parameters: any;

        /**
         * A dictionary (key, value) describing the node properties. Useful for 
         * defining custom variables inside the visual editor.
         *
         * @property properties
         * @type {Object}
         * @readonly
        **/
        properties: any;

        /**
         * Initialization method.
         *
         * @method initialize
         * @constructor
        **/
        initialize(): void;

        /**
         * This is the main method to propagate the tick signal to this node. This 
         * method calls all callbacks: `enter`, `open`, `tick`, `close`, and 
         * `exit`. It only opens a node if it is not already open. In the same 
         * way, this method only close a node if the node  returned a status 
         * different of `b3.RUNNING`.
         *
         * @method _execute
         * @param {Tick} tick A tick instance.
         * @returns {Constant} The tick state.
         * @protected
        **/
        protected _execute(tick: Tick): number;

        /**
         * Wrapper for enter method.
         *
         * @method _enter
         * @param {Tick} tick A tick instance.
         * @protected
        **/
        protected _enter(tick: Tick): void;

        /**
         * Wrapper for open method.
         *
         * @method _open
         * @param {Tick} tick A tick instance.
         * @protected
        **/
        protected _open(tick: Tick): void;

        /**
         * Wrapper for tick method.
         *
         * @method _tick
         * @param {Tick} tick A tick instance.
         * @returns {Constant} A state constant.
         * @protected
        **/
        protected _tick(tick: Tick): number;

        /**
         * Wrapper for close method.
         *
         * @method _close
         * @param {Tick} tick A tick instance.
         * @protected
        **/
        protected _close(tick: Tick): void;

        /**
         * Wrapper for exit method.
         *
         * @method _exit
         * @param {Tick} tick A tick instance.
         * @protected
        **/
        protected _exit(tick: Tick): void;
        /**
         * Enter method, override this to use. It is called every time a node is 
         * asked to execute, before the tick itself.
         *
         * @method enter
         * @param {Tick} tick A tick instance.
        **/
        enter(tick: Tick): void;

        /**
         * Open method, override this to use. It is called only before the tick 
         * callback and only if the not isn't closed.
         *
         * Note: a node will be closed if it returned `b3.RUNNING` in the tick.
         *
         * @method open
         * @param {Tick} tick A tick instance.
        **/
        open(tick: Tick): void;

        /**
         * Tick method, override this to use. This method must contain the real 
         * execution of node (perform a task, call children, etc.). It is called
         * every time a node is asked to execute.
         *
         * @method tick
         * @param {Tick} tick A tick instance.
        **/
        tick(tick: Tick): number;

        /**
         * Close method, override this to use. This method is called after the tick
         * callback, and only if the tick return a state different from 
         * `b3.RUNNING`.
         *
         * @method close
         * @param {Tick} tick A tick instance.
        **/
        close(tick: Tick): void;

        /**
         * Exit method, override this to use. Called every time in the end of the 
         * execution.
         *
         * @method exit
         * @param {Tick} tick A tick instance.
        **/
        exit(tick: Tick): void;
    }

    /**
     * Action is the base class for all action nodes. Thus, if you want to 
     * create new custom action nodes, you need to inherit from this class. 
     *
     * For example, take a look at the Runner action:
     * 
     *     var Runner = b3.Class(b3.Action);
     *     var p = Runner.prototype;
     *     
     *         p.name = 'Runner';
     *     
     *         p.tick = function(tick) {
     *             return b3.RUNNING;
     *         }
     *
     * @class Action
     * @extends BaseNode
    **/
    class Action extends BaseNode{
        
    }
}

declare var pomelopb;
