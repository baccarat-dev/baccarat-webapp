<script>
  import { supabase } from "../../supabaseClient";
  import {
    resultsList,
    winNbrsList,
    isPageLoading,
  } from "../../store/sessionStore";

  export async function fetch() {
    const { data, error } = await supabase
      .from("records")
      .select("result,winNbr");
    $resultsList = data.map((x) => x.result);
    $winNbrsList = data.map((x) => x.winNbr);
    $isPageLoading = false;
    console.log(data);
  }
</script>

<div>
  <h1 class="text-primary mx-3" style="font-size: 1.75rem;">History</h1>
  <hr class="mx-3" style="width: auto;" />

  {#if $resultsList.length}
    <div class="d-flex flex-wrap">
      {#each $resultsList as res, i}
        <div class="card p-0 m-2" style="width: 66px;">
          <h5 class="card-header p-1 m-0 text-center">
            <span>
              {res} - {$winNbrsList[i]}
            </span>
          </h5>
          <div class="card-body p-0 m-0 text-center text-muted font-">
            {i + 1}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="alert alert-warning mx-2">
      <h3 class="text-center text-warning">No Recent Data Yet</h3>
    </div>
  {/if}
</div>
