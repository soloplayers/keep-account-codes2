let id: number=parseInt(localStorage.getItem('_idMax')||'0')||0;
function createId(){
	id+=1;
	localStorage.setItem('_idMas',id.toString());
	return id;
}
export default createId;