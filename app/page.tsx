import LocationRequest from '@/components/LocationRequest';
import './styles/Home.css';

export default function Home() {
  return (
    <main className="container">
      <div className="content">
        <h1 className="title">
          Weather App
        </h1>
        <LocationRequest />
      </div>
    </main>
  );
}
