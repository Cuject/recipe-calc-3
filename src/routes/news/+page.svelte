<script>
    export let data;
</script>

<h1>
    Today's headlines
</h1>

<h2>Logged in as {data.email}</h2>


{#each data.news as article}
    <h2>{article.title}</h2>
{/each}

<form method="post" action="?/log_out">
    <button type="submit"> Log Out </button>
</form>

{#if data.isAdmin}
    <h1>This only shows when logged in as admin</h1>
{/if}

{#if data.isGuest}
    <h1>This only shows when logged in as guest</h1>
{/if}