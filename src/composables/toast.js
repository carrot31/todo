import { ref, onUnmounted } from "vue";

export const useToast = () =>{
  
  //저장 후 알림 Toast
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastAlertType= ref('');
  const toastTimeout = ref(null);
  const triggerToast = (message, type='success') => {
      toastMessage.value = message;
      toastAlertType.value = type;
      showToast.value = true;
      //2초후 메세지 사라짐
      toastTimeout.value = setTimeout(()=>{
        console.log('hello')
        toastMessage.value = '';
        toastAlertType.value = '';
        showToast.value = false;
      }, 5000)
  };

  //메모리 누수 막기(save 후 페이지 이동시 setTimeout() 막기)
  onUnmounted(()=>{
    console.log('unmounted')
    clearTimeout(toastTimeout.value)
  })

  return{
    showToast,
    toastMessage,
    toastAlertType,
    triggerToast,
  }
}