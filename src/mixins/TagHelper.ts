import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export class TagHelper extends Vue{
    createTag(){
        const name=window.prompt('请输入标签名');
        if(name){
            if(name.trim()==='') {
                return window.alert('标签名不能为空');
            }
            if(this.$store.state.isCreateTagError){
                window.alert('标签名重复了！')
                this.$store.state.isCreateTagError=null;
                return;
            }
            else {
                this.$store.commit('createTag',name);
                window.alert('标签创建成功！');
            }
        }
    }
}
export default TagHelper;