export default function Cancelable(promise){
  let hasCanceled = false;
  const wrappedPromise = new Promise((resolve, reject)=>{
    promise.then((val)=>{
      hasCanceled?reject({isCanceled:true}):resolve(val)
    });
    promise.catch((error)=>{
      hasCanceled?reject({isCanceled:true}):resolve(error)
    })
  });
  return {
    promise:wrappedPromise,
    cancel(){
      hasCanceled=true;
    }
  }
}