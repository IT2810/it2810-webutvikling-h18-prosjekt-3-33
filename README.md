## Innhold og funksjonalitet

Vår PIMM består av tre hovedskjermer (_screen_): en kalender (`CalendarScreen`), en kontaktliste (`ContactsScreen`) og en oversikt over daglige mål (`GoalsScreen`). Alle skjermene er interaktive, men først og fremst er laget for å demonstrere funksjonalitet. Når brukeren interagerer med skjermene, ved f.eks. å legge til en kontakt, lagres den nye informasjonen i AsyncStorage.

### Kalender
Kalenderen vår bruker `<Agenda />` fra `react-native-calendars`. NavigationStacken til Kalenderen består av to skjermer (`CalendarScreen` og `AddCalendarItem`), hvor `CalendarScreen` tar i bruk `<Agenda />` for å vise frem _to-do’s_ og `AddCalendarItem` bruker `react-native-datepicker` for å kunne velge dato og tid som legges til i Agendaen vår. 

### Kontakter
Kontaktlisten tar i bruk den den innebygde komponenten `<SectionList />` som følger med react-native. `SectionList` trenger et sections objekt som er strukturert slik at kontaktlisten vises på ønsket måte. Hver kontakt  er en selvlagd `<Contact />` komponent, med ønsket funksjonalitet. For å legge til kontakter i kontaktlisten har vi benyttet `<Modal />` fra ‘react-native’ biblioteket, som displayer `AddContactScreen`-komponenten som blir brukt til å legge til nye kontakter.

### Daglige mål
Daglige mål viser tre utvalgte daglige mål: antall skritt, antall timer studert, og antall pushups tatt. Brukeren kan velge å slå av og på de forskjellige målene via `EditGoalScreen`, og det respektive antallet i hvert mål kan også endres.

## Teknisk
I henhold til oppgavebeskrivelsen har vi utviklet en native app ved hjelp av React Native og ved å bruke Expo for oppsett. 

Vi har også brukt AsyncStorage for som lager. Koden vi har brukt for å skrive og lese fra AsyncStorage (`/components/Storage.js`) er stort sett hentet fra [dokumentasjonen](https://docs.expo.io/versions/latest/react-native/asyncstorage). Vi laget likevel noen wrapper-funksjoner (e.g. `getContacts()`, `storeContacts(data)`) da det var anbefalt, og for å gjøre det enklere å bruke `Storage` i andre komponenter.
## Struktur og navigering
Appen vår er opprettet med kommandoen `expo init`. I denne templaten lå det et forslag til struktur som bruker `react-navigation` til navigasjon i appen, ved å ha en _stackNavigator_ for hver fane i appen . Vi byttet ut template-skjermene med det vi selv hadde bruk for, og la til _underskjermer_ i de ulike navigasjonsstackene (e.g. komponentene `CalendarScreen`og `AddCalendarItem` er i samme stack fordi de tilhører samme fane, men viser to ulike skjermer).

Komponent- og mappestrukturen vår følger navigeringsflyten i stor grad. Hovedskjermene ligger i `/screens`, og videre har vi `/screens/SubXScreen` for hver X av underskjermene. Alle øvrige komponenter (f.eks. `PedometerCounter`) ligger i `/components`-mappen.

Her er en illustrasjon av navigasjons- og komponentstrukturen vår:
![Navigation and component structure](/prosjekt3/report/comp_struct.png)

## Tredjeparter

### Agenda
[Agenda](https://github.com/wix/react-native-calendars#agenda)
Valget av kalender landet på Agenda fra `react-native-calendars`. Agendaen ser estetisk ut og lar oss konfigurere hvordan items blir rendret til skjerm.

### DatePicker
[DatePicker](https://github.com/xgfe/react-native-datepicker)
Agenda har et spesifikt format på hvordan items objektene skal se ut for å kunne rendre disse korrekt i selve komponenten. Her traff `react-native-datepicker` formatet vi trengte på dato (‘YYYY-MM-DD’) og ble et naturlig valg for å kunne lage nye items for å bli displayet i agendaen. 

### Pedometer
For å telle skritt i `GoalScreen` brukte vi [`Pedometer`](https://docs.expo.io/versions/latest/sdk/pedometer), som er en kryssplattform-wrapper for Core Motion (iOS) og Google Fit (Android).. Første gang man åpner appen vår blir man derfor spurt om tillatelse til å bruke de aktuelle tjenestene. 
Merk at Pedometer ikke støtter alle mulige eldre devicer (vi har f.eks. dokumentert at det ikke fungerer på iPhone 5). Det er ikke så mye dokumentasjon om Pedometer, men her er hvertfall en [forklarende diskusjonstråd](https://forums.expo.io/t/pedometer-module-requirements/3766).

## Tutorials
### Skritt-telling med Pedometer
Pedometer er en del av Expo sin SDK. For å anvende den, fulgte vi Expo sin [dokumentasjon](https://docs.expo.io/versions/latest/sdk/pedometer) i stor grad. Det er herfra vi henter funksjonene `_subscribe()` og `_unsubscribe()`. Kort fortalt henter `_subscribe()` ut antall skritt for dagens dato, og oppdaterer staten til Pedometer-komponenten hver gang det registreres et nytt skritt. `_unsubscribe()` gjør slik at Pedometer slutter å hente skritt fra Core Motion eller Google Fit, og kalles når `PedometerCounter` unmounter. Slik ser det mest essensielle i vår `PedometerCounter` ut: 

```javascript
import React from 'react';
import Expo from 'expo';
import { Pedometer } from 'expo';

export default class PedometerCounter extends React.Component {
  state = {
    isPedometerActive: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    stepGoal: 0, // defined goal to track daily progress
  };
  componentDidMount() {
    this._subscribe();
    this.setState({
      stepGoal: this.props.stepGoal
    })
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.stepGoal != prevProps.stepGoal){
      this.setState({stepGoal: this.props.stepGoal})
    }
  }

  render() {
    var totalProgress = this.state.pastStepCount + this.state.currentStepCount;
    var goal = this.state.stepGoal;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>
            {totalProgress} out of {goal}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={progressBarStyle(totalProgress, goal)}>
          </View>
        </View>

      </View>
    );
  }
}
```

For å anvende `PedometerCounter` til å holde orden på om målet for dagens antall skritt er nådd, importerer vi komponenten i `StepGoal`, som er ett av tre daglige mål det går an å tracke. `StepGoal` blir igjen brukt i `GoalsScreen`, som er hovedkomponenten i navigasjonsstacken `GoalsStack`. Slik ser `StepGoal` ut:

```javascript
import React from 'react';
import PedometerCounter from './PedometerCounter';

export default class StepGoal extends React.Component {
  state = {
    stepGoal: 0,
  }
  componentDidMount(){
    this.setState({stepGoal: this.props.stepGoal})
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.stepGoal != prevProps.stepGoal){
      this.setState({stepGoal: this.props.stepGoal})
    }
  }
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of steps last 24 hours </Text>
          <PedometerCounter stepGoal={this.state.stepGoal} />
        </View>
      </ScrollView>
    );
  }
}
```

### Endre mål med navigation og react-native-slider
Hver av de forskjellige mål-komponentene i GoalScreen kan endres ved å klikke på de og justere målet for gjeldende komponent med en slider. 

Alle Screen arver automatisk [props.navigation](https://facebook.github.io/react-native/docs/navigation), som gir mange muligheter til informasjonsflyt mellom screens i samme navigation stack. 

Når man klikker på en komponent i GoalScreen, kalles ` () =>this.props.navigation.navigate('EditStep', {stepGoal: this.state.stepGoal, onLoad: this.onLoad})` som sender med målet for antall steg (som GoalScreen henter fra AdsyncStorage), og i tillegg sender med en callbackfunction onLoad. onLoad er veldig enkelt definert slik:
```javascript
onLoad = data => {
		this.setState(data);
	}
```

Inn i f. eks. EditStepGoal, settes state fra navigation parameterene:
```javascript
componentDidMount(){
		this.setState({stepGoal: this.props.navigation.getParam('stepGoal', 0)})
	}
```
Selve sliderene bruker react-native-slider:
```javascript
<Slider
          value={this.state.stepGoal}
          onValueChange={(value) => this.changeStepGoal(value)}
          minimumValue={0}
          maximumValue={20000}
          step={1000}/>
```
Funksjonen som blir kalt, altså ´this.changeStepGoal(value)` setter ny state når brukeren endrer på slideren. Utfordringen med å sende denne dataen tilbake til GoalScreen, er at GoalScreen ikke mounter på nytt når klikker seg tilbake dit. For å løse dette bruker vi callback-funksjonen vi sendte med navigation params tidligere, som må oppdateres med riktig input data når state endres. Så i ComponentDidUpdate legger jeg til: 
```javascript
const { navigation } = this.props;
			navigation.state.params.onLoad({ stepGoal: this.state.stepGoal });
```
som setter nye verier i navigation state, som igjen brukes av callback-funksjonen når vi navigerer oss tilbake til GoalScreen etter å ha endret målet vårt i EditStepGoal. 

## Testing
Vi har skrevet enhetstester i test-rammeverket Jest. Vi har strukturert testene våre i tre forskjellige ```__tests__```-mapper (```/__tests__```, ```/screens/__tests__``` og ```/components/__tests__```.

For å kunne gjennomføre enhetstesting måtte vi flytte ut en del av `onPress`-funksjonene over til å være metoder definert i klassene, og heller refere `onPress`-propen til å kalle på `this.handleOnPressTextChange`, i stedet for å ha funksjonskallene direkte i `onPress`-props. Vi måtte generelt omstrukturere litt av koden vår slik at den passet bedre til å bli testet med Jest, for eksempel ved å dekomponere en stor funksjon i mindre.

For å kjøre testene våre:
Sørg for å ha Jest installert globalt, f.eks. ved å sjekke at `jest -v` returnerer versjonen din. Hvis det ikke er installert globalt: `npm i jest-cli --global`
Naviger til `/prosjekt3`i prosjektmappen og kjør `jest` (eventuelt `jest --coverage` eller `jest --verbose` hvis du vil se hhv. test coverage og description av testene).

Ved innlevering av prosjeketet så outputet fra `jest --verbose` slik ut:

< SETT INN OUTPUT FRA `jest --verbose` NÅR VI ER FERDIGE >

## Problemer og refleksjon
I løpet av prosjektet støtte vi på noen små og noen store problemer. Erfaringen fra hvordan vi løste disse tar med oss videre til prosjekt 4.

#### Brukergrensesnitt
I dette prosjektet jobbet vi uten noen skisse for hvordan de ulike skjermene skulle se ut. Ettersom vi hadde ansvar for ulike områder av appen, ble det fort litt forskjellige veivalg i styling, som tar mye tid å prøve å samkjøre i ettertid. Til prosjekt 4 skal vi prøve å lage et skissert design på forhånd, slik at vi har konkrete mål for hvordan UI-en skal se ut. Vi skal også se nærmere på å bruke UI-bibliotek til neste gang, som f.eks. [Material](https://github.com/xinthink/react-native-material-kit) eller [NativeBase](https://github.com/GeekyAnts/NativeBase). 

#### Jest og eksterne bibliotek
For å toggle av/på mål under _GoalsScreen_, valgte vi å bruke en ferdiglaget [ToggleSwitch](https://github.com/aminebenkeroum/toggle-switch-react-native). Etter vi importerte denne komponenten fikk vi noen obskure feilmeldinger i Jest av typen 
```bash
import React from 'react';
SyntaxError: Unexpected token import
```
Da dette tydeligvis var et problem flere hadde (ref. Piazza og Blackboard-forum), valgte vi å legge ved ```toggle-switch-react-native``` lokalt som en en egen komponent under _/screens/SubGoalScreens/ToggleSwitch.js_ for å slippe å kaste bort enda flere timer på feilsøking.

#### Android
Å sette opp en Android-emulator viste seg å være en knotete prosess. Ingen i gruppen har Android-telefoner, så vi har ikke testet ut appen vår på denne plattformen. Fra Piazza-forumet sto det også at dette var greit ([ref.](https://piazza.com/class/jl25sg0g4ql5nk?cid=92)), så lenge vi gjennomgikk hva som potensielt kunne gå feil på Android. Derfor:

Vi har vært påpasselig med å sjekke at tredjepartene vi har brukt er utviklet for begge operativsystemene. [**AsyncStorage**](https://docs.expo.io/versions/latest/react-native/asyncstorage) og [**Pedometer**](https://docs.expo.io/versions/v30.0.0/sdk/pedometer) som vi har hentet fra Expo skal fungere smertefritt på begge, ettersom de kaller videre på native metoder. 



