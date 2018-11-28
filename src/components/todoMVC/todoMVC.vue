<template>
  <section class="todomvc">
    <!-- 头部初始内容 -->
    <header class="header">
      <h1>todos</h1>
      <input type="text" placeholder="请输入内容..." autofocus="autofocus" v-model="input_content" v-on:keyup.enter="add_input_list" >
    </header>
    <section class="main" v-show="todo_count">
      <!-- 全选箭头 -->
      <div class="toggle-all" @click="selectAll()"></div>
      <!-- 列表内容 -->
      <ul class="toggle-list"
       v-for="(item,index) in v_all"
       :key="index"
       >
        <li class="todo" 
         @mouseover="m_over(index)"
         @mouseleave="m_leave(index)"
         >
          <div class="view">
            <span class="toggle" :class="item.classes" @click="my_selected(item)"></span>
            <label for="">{{item.content}}</label>
            <button class="destory"
             v-show="item.closed"
             @click="del_input_list(item,item.id)"
             >
             X
             </button>
          </div>
          <!-- <input type="text" class="edit"> -->
        </li>
      </ul>
    </section>
    <!-- 底部内容 -->
    <footer class="footer" v-show="todo_count">
      <span class="todo-count">{{count}} {{it}} left</span>
      <ul class="filters">
        <li v-for="(item,index) in todo_views"
        :key="index"
        >
        <a href="#"
         :class="item.cls"
         @click="viewAll(index)"
         >
         {{item.name}}
         </a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearAll()">Clear completed</button>
    </footer>

  </section>
</template>

<script>
export default {
  data(){
    return{
      input_content:'',
      todo_lists: [],
      it: 'item',
      todo_count: 0,
      todo_views: [
        {name:"All",cls:"border",key: 0},
        {name:"Active",cls:"",key: 1},
        {name:"Completed",cls:"",key: 2}
        ],
      v_all: [],
      v_active: [],
      v_completed: [],
      count: 0
    }
  },
  computed:{
    its(){
      if (this.todo_count>1) {
        return 'items'
      }else{
        return 'item'
      }
    }
  },
  methods:{
    add_input_list(){
      this.todo_lists.push({
        id: this.todo_count++,
        content: this.input_content,
        closed: false,
        selected: false,
        classes: ''
      });
      var _this = this;
      this.todo_views.forEach(function(item){
        if (item.key == 0&&item.cls =="border") {
          _this.v_all = _this.todo_lists;
          _this.count = _this.v_all.length;
        }else if(item.key == 1&&item.cls =="border"){
          _this.v_active = [];
          _this.todo_lists.forEach((item)=>{
            if (item.classes == '') {
              _this.v_active.push(item);
            }
          })
          _this.count = _this.v_active.length;
          _this.v_all = _this.v_active;
        }else if(item.key == 2&&item.cls =="border"){
          _this.v_completed = [];
          _this.todo_lists.forEach((item)=>{
            if (item.classes == 'toggle_a') {
              _this.v_completed.push(item);
            }
          })
          _this.count = _this.v_completed.length;
          _this.v_all = _this.v_completed;
        }
      });
    
      this.input_content = '';
      this.it = (this.todo_count>1) ?'items':'item';

    },
    m_over(index){
      this.v_all[index].closed = true;
    },
    m_leave(index){
      this.v_all[index].closed = false;
    },
    del_input_list(c,index){
      // this.$delete(this.v_all,index);
      this.todo_count--;
    // 这儿需要添加新的内容，修改bug

      let k = [];
      this.todo_lists.forEach((item)=>{
        if (item!==c) {
          k.push(item)
        }
      })
      this.todo_lists = k;
      this.v_all=k;

      var _this = this;
      this.todo_views.forEach(function(item){
        
      if(item.key == 1&&item.cls =="border"){
        _this.v_active = [];
        _this.todo_lists.forEach((item)=>{
          if (item.classes == ''&& index !== item.id) {
            _this.v_active.push(item);
          }
        })
        _this.v_all = _this.v_active;
        }else if(item.key == 2&&item.cls =="border"){
          _this.v_completed = [];
          _this.todo_lists.forEach((item)=>{
            if (item.classes == 'toggle_a'&& index !== item.id) {
              _this.v_completed.push(item);
            }
          })
          _this.v_all = _this.v_completed;
        }
      });


      _this.count = _this.v_all.length;
      if(this.todo_count == 0){
        this.v_all = [];
      }
      this.it = (this.todo_count>1) ?'items':'item';
    },
    my_selected(index){
       index.selected = !index.selected;
      if(index.selected == true){
        index.classes = 'toggle_a';
        this.v_completed =[];
        this.todo_lists.forEach((item)=>{
          if (item.classes == 'toggle_a') {
            this.v_completed.push(item);
          }
        });
      }else{
        index.classes = '';
        this.v_active = [];
        this.todo_lists.forEach((item)=>{
          if (item.classes == '') {
            this.v_active.push(item);
          }
        });
      }
      
    },
    selectAll(){
      var num = 0;
      this.todo_lists.forEach((item)=>{
        if(item.selected ==true){
          num++;
        }
      })
      if(num ==this.todo_lists.length){
        this.todo_lists.forEach((item)=>{
          item.selected = false;
          item.classes = ''
        })
      }else{
        this.todo_lists.forEach((item)=>{
          item.selected = true;
          item.classes = 'toggle_a';
        })
      }
    },
    viewAll(index){
      var num = 0;
      this.todo_views.forEach((item) => {
          item.cls = '';
        });
      if (index == 0) {
        this.todo_views[index].cls = 'border';
        this.v_all = this.todo_lists;
        this.count = this.v_all.length;
      }else if (index == 1) {
        this.todo_views[index].cls = 'border';
        this.v_active = [];
        this.todo_lists.forEach((item)=>{
          if (item.classes == '') {
            this.v_active.push(item);
          }
        })
 
        this.count = this.v_active.length;
        this.v_all = this.v_active;
        num = 0;
      }else{
        this.todo_views[index].cls = 'border';
        this.v_completed = [];
        this.todo_lists.forEach((item)=>{
          if (item.classes == 'toggle_a') {
            this.v_completed.push(item);
          }
        })
        
        this.count = this.v_completed.length;
        this.v_all = this.v_completed;
        num = 0;
      }
    },
    clearAll(){
      
      this.v_all = [];
      this.todo_lists = [];
      this.v_active = [];
      this.v_completed = [];
      this.todo_count = this.v_all.length;
      this.todo_views[0].cls = 'border';
      this.todo_views[1].cls = '';
      this.todo_views[2].cls = '';

    }
  }
}
</script>

<style lang="less">
@import './todoMVC';
</style>