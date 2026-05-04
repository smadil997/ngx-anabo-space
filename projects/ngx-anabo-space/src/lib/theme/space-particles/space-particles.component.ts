import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
  NgZone,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShootingStar, SpaceColor, SpaceTheme, Star } from '../../model/space-particles.model';



@Component({
  selector: 'app-space-particles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './space-particles.component.html',
  styleUrls: ['./space-particles.component.css'],
})
export class SpaceParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() particleCount: number = 150;
  @Input() particaleType: string = "star";
  @Input() centerText: string = "";
  @Input() speed: number = 4;
  @Input() height: number = 650;
  @Input() width: number = 650;
  @Input() showControls: boolean = true;
  @Input() theme: SpaceTheme = 'all'; // ✅ one input controls everything
  @Input() color: SpaceColor = 'classic'; // ✅ one input controls everything



  private ctx!: CanvasRenderingContext2D;
  private animFrameId!: number;
  private stars: Star[] = [];
  private shooting: ShootingStar | null = null;
  private shootTimer: number = 180;

  mouse = { x: -9999, y: -9999 };

  public config = {
    stars: true,
    lines: true,
    glow: true,
  };

  private W: number = 0;
  private H: number = 0;

  private COLORS: string[] = [];
  private isBrowser: boolean;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
  }

  private resolveTheme(theme: SpaceTheme) {
    const themes: Record<SpaceTheme, typeof this.config> = {
      'stars-lines': { stars: true, lines: true, glow: false },
      'stars-glow': { stars: true, lines: false, glow: true },
      'all': { stars: true, lines: true, glow: true },
    };

    return themes[theme] ?? themes['all']; // fallback to all
  }

  private resolveColor(color: SpaceColor): string[] {
    const palettes: Record<SpaceColor, string[]> = {
      classic: ['#ffffff', '#aac8ff', '#ffd6a5', '#c9b8ff', '#a8e6cf'],
      aurora: ['#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#ffffff'],
      nebula: ['#ff6b6b', '#ff9f43', '#ffd93d', '#ff6b9d', '#ffffff'],
      galaxy: ['#c77dff', '#9d4edd', '#7b2fff', '#e0aaff', '#ffffff'],
      matrix: ['#00ff41', '#00cc33', '#39ff14', '#ccff00', '#ffffff'],
      mars: ['#ff4d4d', '#ff6b35', '#ff9a00', '#ffccd5', '#ffffff'],
      ocean: ['#48cae4', '#00b4d8', '#0096c7', '#90e0ef', '#ffffff'],
      blossom: ['#ffb3c6', '#ff85a1', '#ffc8dd', '#ff5c8a', '#ffffff'],
      moonlight: ['#e2eafc', '#c5cae9', '#9fa8da', '#7986cb', '#ffffff'],
      electric: ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
    };

    return palettes[color] ?? palettes['classic'];
  }
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;  // ✅ skip on server
    this.config = this.resolveTheme(this.theme);
    this.COLORS = this.resolveColor(this.color);
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initStars();

    // Run animation outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });

  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize();
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.W = canvas.width = canvas.offsetWidth;
    this.H = canvas.height = canvas.offsetHeight;
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  onMouseLeave(): void {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  toggle(key: keyof typeof this.config): void {
    this.config[key] = !this.config[key];
  }

  private initStars(): void {
    this.stars = Array.from({ length: this.particleCount }, () =>
      this.createStar(true)
    );
  }

  private createStar(init: boolean): Star {
    const z = Math.random() * 3 + 0.4;
    return {
      x: Math.random() * this.W,
      y: init ? Math.random() * this.H : Math.random() > 0.5 ? -2 : this.H + 2,
      z,
      r: z * 0.9,
      color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      vx: (Math.random() - 0.5) * 0.2 * z,
      vy: (0.1 + Math.random() * 0.15) * z,
      mx: 0,
      my: 0,
    };
  }

  private updateStar(s: Star): void {
    const spd = this.speed / 4;
    s.twinkle += s.twinkleSpeed;

    const dx = this.mouse.x - s.x;
    const dy = this.mouse.y - s.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      const force = ((120 - dist) / 120) * 0.4;
      s.mx += (-dx / dist) * force;
      s.my += (-dy / dist) * force;
    }

    s.mx *= 0.92;
    s.my *= 0.92;
    s.x += (s.vx + s.mx) * spd;
    s.y += (s.vy + s.my) * spd;

    if (s.y > this.H + 5 || s.x < -5 || s.x > this.W + 5) {
      Object.assign(s, this.createStar(false));
    }
  }

  private drawStar(s: Star): void {
    const ctx = this.ctx;
    const a = s.alpha * (0.7 + 0.1 * Math.sin(s.twinkle));
    ctx.save();
    ctx.globalAlpha = a;
    if (this.config.glow) {
      ctx.shadowBlur = s.r * 6;
      ctx.shadowColor = s.color;
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.restore();
  }

  private drawLines(): void {
    const ctx = this.ctx;
    const maxDist = 110;

    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - d / maxDist) * 0.18;
          ctx.strokeStyle = '#8ab4ff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.stars[i].x, this.stars[i].y);
          ctx.lineTo(this.stars[j].x, this.stars[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  private drawMouseGlow(): void {
    if (this.mouse.x < 0) return;
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, 120
    );
    g.addColorStop(0, 'rgba(100,150,255,0.12)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.mouse.x, this.mouse.y, 120, 0, Math.PI * 2);
    ctx.fill();
  }

  private handleShootingStar(): void {
    this.shootTimer--;
    if (this.shootTimer <= 0) {
      this.shootTimer = 180 + Math.random() * 200;
      this.shooting = {
        x: Math.random() * this.W * 0.8,
        y: Math.random() * this.H * 0.3,
        len: 80 + Math.random() * 60,
        alpha: 1,
        speed: 5 + Math.random() * 4,
        angle: Math.PI / 5 + Math.random() * 0.3,
      };
    }

    if (!this.shooting) return;

    this.shooting.x += Math.cos(this.shooting.angle) * this.shooting.speed;
    this.shooting.y += Math.sin(this.shooting.angle) * this.shooting.speed;
    this.shooting.alpha -= 0.025;

    if (this.shooting.alpha <= 0) {
      this.shooting = null;
      return;
    }

    const tx = this.shooting.x - Math.cos(this.shooting.angle) * this.shooting.len;
    const ty = this.shooting.y - Math.sin(this.shooting.angle) * this.shooting.len;

    const ctx = this.ctx;
    const grad = ctx.createLinearGradient(tx, ty, this.shooting.x, this.shooting.y);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(1, `rgba(255,255,255,${this.shooting.alpha})`);

    ctx.save();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(this.shooting.x, this.shooting.y);
    ctx.stroke();
    ctx.restore();
  }

  private animate(): void {
    const ctx = this.ctx;
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, this.W, this.H);

    this.drawMouseGlow();
    if (this.config.lines) this.drawLines();
    if (this.config.stars) {
      this.stars.forEach(s => {
        this.updateStar(s);
        this.drawStar(s);
      });
    }
    this.handleShootingStar();

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }
}
