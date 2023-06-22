export default function BalanceTile({accountName, balance}){
    return <div className='p-6'>
    <div>{accountName}</div>
    <div>$ {balance}</div>
  </div>
}