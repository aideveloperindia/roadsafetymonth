"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelmetPrototype from "./HelmetPrototype";
import TripleRidingSimulation from "./TripleRidingSimulation";
import DrunkDriveSimulation from "./DrunkDriveSimulation";
import { BrainCircuit, Sparkles, ShieldCheck, WineOff } from "lucide-react";

export default function SimulationPage() {
  return (
    <div className="rs-container py-12 space-y-12">
      <div className="rs-card p-8 bg-gradient-to-br from-emerald-50 to-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4">
          <span className="rs-chip flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" /> Simulation Lab
          </span>
          <h1 className="text-3xl font-semibold text-emerald-900">Spot the Violation → Fix It!</h1>
          <p className="text-slate-600 max-w-2xl">
            Drag-and-drop micro learning challenges that help you identify and correct common road safety violations.
            Earn completion reference IDs for every simulation you master.
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm text-sm text-emerald-700 space-y-3">
          <p className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4" /> Completion Rewards</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>Reference ID for each simulation completion</li>
            <li>Instant feedback on safe decisions</li>
            <li>Supports quiz & certificate progress</li>
          </ul>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto shadow-none border-none">
        <CardHeader className="text-center">
          <CardTitle>Interactive Road Safety Simulations</CardTitle>
          <CardDescription>
            Choose a scenario and drag the suggested solutions onto the violation to transform the scene into a safe one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="helmet" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 rounded-xl bg-emerald-50 p-2">
              <TabsTrigger value="helmet" className="data-[state=active]:bg-white data-[state=active]:shadow">
                <ShieldCheck className="h-4 w-4 mr-2" /> No Helmet
              </TabsTrigger>
              <TabsTrigger value="triple" className="data-[state=active]:bg-white data-[state=active]:shadow">
                <ShieldCheck className="h-4 w-4 mr-2" /> Triple Riding
              </TabsTrigger>
              <TabsTrigger value="drunk" className="data-[state=active]:bg-white data-[state=active]:shadow">
                <WineOff className="h-4 w-4 mr-2" /> No Drunk Driving
              </TabsTrigger>
            </TabsList>

            <TabsContent value="helmet">
              <HelmetPrototype />
            </TabsContent>

            <TabsContent value="triple">
              <TripleRidingSimulation />
            </TabsContent>

            <TabsContent value="drunk">
              <DrunkDriveSimulation />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="rs-card p-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-3">More scenarios arriving soon</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-600">
          <span>• Wrong-side bike riding</span>
          <span>• Signal jumping (bike)</span>
          <span>• Drunk riding (bike)</span>
          <span>• Give way to ambulance (car)</span>
          <span>• Blocked zebra crossing (car)</span>
          <span>• Parking on footpath (car)</span>
          <span>• Overspeed in school zone (car)</span>
          <span>• Tailgating (car)</span>
          <span>• Jaywalking (pedestrian)</span>
          <span>• Using phone while crossing</span>
          <span>• Crossing during green</span>
          <span>• Walking on road instead of footpath</span>
          <span>• Wrong-side auto driving</span>
          <span>• Blocking fire truck (vehicles)</span>
          <span>• Zig-zag/rash overtaking (bike)</span>
        </div>
      </div>
    </div>
  );
}
