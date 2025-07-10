<template>
  <!-- Root container filling viewport and centering content -->
  <div id="app" class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Content wrapper for centralized text and image with vertical spacing -->
    <div class="text-center p-4 space-y-4">
      <!-- Construction SVG, centered with mx-auto and fixed size -->
      <img
        src="./assets/construction.svg"
        alt="Under Construction"
        class="w-48 h-48 mx-auto animate-bounce"
      />

      <!-- Main Heading -->
      <h1 class="text-4xl font-extrabold text-gray-800">
        Sommerschlaf!
      </h1>

      <!-- Subheadings grouped with consistent spacing -->
      <div class="space-y-2 text-lg text-gray-600">
        <p>Der Biber hält seinen Sommerschlaf.</p>
        <p>Bald wird er aber wieder im neuen Glanz erwachen.</p>
      </div>

      <!-- Links section -->
      <div class="space-x-4 text-lg text-gray-600">
        Das
        <a href="https://wiki.dpvonline.de" class="underline hover:text-gray-800">Wiki</a>
        <span> und die </span>
        <a href="https://cloud.dpvonline.de" class="underline hover:text-gray-800">Cloud</a>
        <span> sind aber weiterhin verfügbar.</span>
      </div>
    </div>
  </div>
</template>
