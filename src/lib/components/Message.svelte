<script>
  export let username = "";
  export let content = "";
  const link = "/chat/profiles/" + username;
</script>

<p><a href={link}>{username}</a>: {content}</p>

<style>
  p {
    border-width: 1px;
    animation: slide 0.25s ease;
  }

  @keyframes slide {
    0% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
