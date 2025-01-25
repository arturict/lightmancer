import { LightControl } from "@/components/LightControl";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-8">Smart Light Control</h1>
        <LightControl />
      </div>
    </div>
  );
};

export default Index;