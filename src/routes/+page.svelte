<script>
  import { sha256, sha224 } from 'js-sha256';


  function proto_round(num, d_place){
    num -= Math.floor(num)
    d_place = 0

    return num
  }
</script>

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<button on:click={() => {console.log(sha224("nio"))}}
  class=" items-center px-6 py-3 mb-2 text-white bg-green-500 
  rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">hash</button>

<button on:click={() => {
  console.log(parseFloat(2.4567.toFixed(2)))
  }}
class=" items-center px-6 py-3 mb-2 text-white bg-green-500 
rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">round</button>



<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>