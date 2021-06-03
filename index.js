 
/**
 * 0全部
 * 1已完成
 * 2未完成
 */

let a = new Vue({
    el:'#root',
    data:{
        taskname:'',
        status:0,
        btnName:['全部','已完成','未完成'],
        cache:[],
        showList:[],
        store:[{name:'吃饭',status:2,editor:false,selected:false},
        {name:'学习',status:1,editor:false,selected:false},
        {name:'睡觉',status:2,editor:false,selected:false},
        {name:'起床',status:2,editor:false,selected:false},
        {name:'打游戏',status:2,editor:false,selected:false},
    ]
    },
    methods:{
        addEvent:function(){
            /**生成数据 */
            if(this.taskname){
                if(this.judgeIsHere(this.store,this.taskname)){
                    alert("事件已存在")
                }else{
                    this.store.push({
                        name:this.taskname,
                        status:2,
                        editor:false,
                        selected:false
                    })
                    this.taskname = ''
                }
               
            }else{
                alert("内容不能为空")
            }
            this.caches();
        },
        //查重
        judgeIsHere:function(arr,name){
            let ret = false;
            arr.forEach((item,index)=>{
                if(item.name ==name){
                    ret = true;
                }
            })

            return ret
        },
        editor:function(e,index){
            e.editor = !e.editor;

            let dom = this.$refs.dom[index]
            if(e.editor){
                dom.focus();
                dom.selectionStart = dom.value.length
                dom.selectionEnd = dom.value.length
            }else{
                /**改变数据 */
                console.log(dom.value);
                this.store[index].name = dom.value
            }
             
            this.caches();
         
            // console.log(e);

        },
        changeStatue:function(status){
            console.log(status);
            this.status = status;
           
        },
        deleted:function(item,id){
            
            this.store.splice(id,1);
            this.caches();
        },
        searchResult:function(e){
            this.showList = this.store.filter((item)=>{
                return item.name.indexOf(e)!=-1;
            })
            console.log(this.result);
        },
        selected:function(e,index){
            this.store[index].selected = !this.store[index].selected;
            this.caches();
        },
        deleteSelected:function(){
            this.store = this.store.filter((item,index)=>{
                return !item.selected
            })
           
            this.caches();
        },
        doneSelected:function(){
            let str = ''
            this.store.forEach(item=>{
               
                if(item.selected){
                    item.status = 1;
                    item.selected = false;
                    str += `${item.name} `
                }
               
            })
            if(str.length!=0){
                alert(`${str}事件已完成`)
            }
          this.caches();
          
        },
        caches:function(){
            console.log('缓存..........');
            let res = JSON.stringify(this.store);
            localStorage.setItem('todolist',res);
        }
     
    },
    
   created(){
     
    　let todolist = localStorage.getItem('todolist');
    console.log(JSON.parse(todolist));
        if(todolist){
           
        this.store = JSON.parse(todolist);
        }
   },
 
 
})