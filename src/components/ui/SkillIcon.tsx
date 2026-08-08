import React from "react";
import {
  Code2,
  Globe,
  FileCode,
  Code,
  Layout,
  Palette,
  Sparkles,
  Zap,
  Server,
  Network,
  ShieldCheck,
  Database,
  Cpu,
  Gamepad2,
  Terminal,
  Sliders,
  Workflow,
  Coins,
  Figma,
  LayoutGrid,
  Layers,
  Component,
  Monitor,
  GitBranch,
  Github,
  Laptop,
  Cloud,
  Box,
} from "lucide-react";

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = "w-5 h-5" }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className={className} />,
    Globe: <Globe className={className} />,
    FileCode: <FileCode className={className} />,
    Code: <Code className={className} />,
    Layout: <Layout className={className} />,
    Palette: <Palette className={className} />,
    Sparkles: <Sparkles className={className} />,
    Zap: <Zap className={className} />,
    Server: <Server className={className} />,
    Network: <Network className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    Database: <Database className={className} />,
    Cpu: <Cpu className={className} />,
    Gamepad2: <Gamepad2 className={className} />,
    Terminal: <Terminal className={className} />,
    Sliders: <Sliders className={className} />,
    Workflow: <Workflow className={className} />,
    Coins: <Coins className={className} />,
    Figma: <Figma className={className} />,
    LayoutGrid: <LayoutGrid className={className} />,
    Layers: <Layers className={className} />,
    Component: <Component className={className} />,
    Monitor: <Monitor className={className} />,
    GitBranch: <GitBranch className={className} />,
    Github: <Github className={className} />,
    Laptop: <Laptop className={className} />,
    Cloud: <Cloud className={className} />,
    Box: <Box className={className} />,
  };

  return iconMap[name] || <Code className={className} />;
};
