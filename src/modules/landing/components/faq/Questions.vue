
  <template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            Was du zum Thema "Gesund" im Food-Inspi wissen musst.
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Such dir die passende Frage aus der Liste her. Wenn dir eine Frage
            fehlt schreibe eine
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
              >Nachricht an Inspi</a
            >
          </p>
        </div>
        <div class="mt-12 lg:col-span-2 lg:mt-0">
          <dl class="space-y-12">
            <div v-for="faq in faqs" :key="faq.question">
              <dt class="text-lg font-medium leading-6 text-gray-900">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 text-base text-gray-500">{{ faq.answer }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: "Was ist Gesundes Essen? ",
    answer:
      "Gesundes Essen erfüllt zwei Kriterien. Es entfällt Nährstoffe die der Menschliche Körper täglich braucht. " +
      "Dazu enthällt das Essen keine oder nur wenige schädliche Inhaltsstoffe. Natürlich ist das keine schwarz und weiß Einteilung " +
      ", sondern eine Graustufen Skala. Eine sehr gute Einteilung bietet der Nutri Score",
  },
  {
    question: "Was ist der Nutri Score?",
    answer:
      "Der Nutri Score wurden von Französichen Wissenschaftlern erstellt und basiert auf empirischen Daten. Es ist ein sehr einfacher Algorytmus der auf jedes Essen angewant werden kann. Der Nutri-Score wird auch Lebensmittelampel genannt und ist mittlereweile auf vielen Lebensmittel abgedruckt. z.B. auf allen Rewe Eigenmarkten.",
  },
  {
    question: "Wie wird der Nutri-Score berechnet?",
    answer:
      "Die Zutaten werden auf eine Menge von 100g normiert und jede Nutri Kategorie Punkte zugeteilt. ",
  },
  {
    question: "Was sind die Nutri-Kategorien?",
    answer:
      "Energie in kJ, Gesättigte Fettsäuren, Natrium und Zucker machen das Essen schlechter. Ballaststoffe, Obst/Gemüse-Anteil und Eiweiß macht das Essen besser.",
  },
  {
    question: "Was deckt der Nutri Score nicht ab?",
    answer:
      "Altersspezifisches Betrachtungen, Abwechselungreiches Essen, Mengen der Portion",
  },
  {
    question: "Wie mache ich mein Essen gesünder?",
    answer:
      "Für gibt es vier Möglichkeiten." +
      "1. Du erhöhst die Menge von Zutaten mit Nutri Score A oder B." +
      "2. Du fügst neue Gesunde Zutaten hinzu." +
      "3. Du verringerst die Menge von Zutaten mit einem Nutri Score schlechter als B" +
      "4. Du ersetzt Zutaten mit einem Nutri Score von B oder schlechter.",
  },
];
</script>
