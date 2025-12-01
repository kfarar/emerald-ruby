import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ColorSelection {
  color: string;
  type: "emerald" | "ruby";
  timestamp: number;
}

const Index = () => {
  const [emeraldColor, setEmeraldColor] = useState("#10b981");
  const [rubyColor, setRubyColor] = useState("#e11d48");
  const [colorHistory, setColorHistory] = useState<ColorSelection[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("colorHistory");
    if (stored) {
      setColorHistory(JSON.parse(stored));
    }
  }, []);

  const addColor = (color: string, type: "emerald" | "ruby") => {
    const newSelection: ColorSelection = {
      color,
      type,
      timestamp: Date.now(),
    };
    const updated = [newSelection, ...colorHistory];
    setColorHistory(updated);
    localStorage.setItem("colorHistory", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Color Selector
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose the color that you think best matches this word.
          </p>
        </div>

        {/* Color Pickers */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Emerald Column */}
          <Card className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center tracking-wider">
              EMERALD
            </h2>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 rounded-lg border-4 border-border shadow-lg"
                  style={{ backgroundColor: emeraldColor }}
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <input
                  type="color"
                  value={emeraldColor}
                  onChange={(e) => setEmeraldColor(e.target.value)}
                  className="w-full h-16 rounded-lg cursor-pointer border-2 border-border"
                />
                <button
                  onClick={() => addColor(emeraldColor, "emerald")}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          </Card>

          {/* Ruby Column */}
          <Card className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center tracking-wider">
              RUBY
            </h2>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div
                  className="w-32 h-32 rounded-lg border-4 border-border shadow-lg"
                  style={{ backgroundColor: rubyColor }}
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <input
                  type="color"
                  value={rubyColor}
                  onChange={(e) => setRubyColor(e.target.value)}
                  className="w-full h-16 rounded-lg cursor-pointer border-2 border-border"
                />
                <button
                  onClick={() => addColor(rubyColor, "ruby")}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Color History Gallery */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Color Gallery</h2>
            <p className="text-muted-foreground">
              {colorHistory.length} color{colorHistory.length !== 1 ? "s" : ""} selected
            </p>
          </div>

          {colorHistory.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
              {colorHistory.map((selection, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg shadow-md border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: selection.color,
                    borderColor: selection.type === "emerald" ? "hsl(var(--emerald))" : "hsl(var(--ruby))",
                  }}
                  title={`${selection.type} - ${selection.color}`}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-muted-foreground">
              No colors selected yet. Pick a color above and add it to the gallery!
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
