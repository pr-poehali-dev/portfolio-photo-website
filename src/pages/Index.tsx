import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const portfolioImages = [
    'https://cdn.poehali.dev/files/e6c50120-d8ff-4754-8d3d-c45523e3db11.jpg',
    'https://cdn.poehali.dev/files/34e3d77e-edb2-491a-aa2c-dc56edb86334.jpg',
    'https://cdn.poehali.dev/files/318e8021-e4e4-4b94-8a82-5126234f1cc3.jpg',
    'https://cdn.poehali.dev/files/566c3afe-78e1-418f-b5a1-47dce58f6328.jpg',
    'https://cdn.poehali.dev/files/eab488e3-bccb-4c6a-bdf6-e0f94f196389.jpg',
  ];

  const services = [
    {
      title: 'Инфографика',
      description: 'Визуализация данных и статистики для презентаций',
      price: 'от 8 000 ₽',
      icon: 'BarChart3'
    },
    {
      title: 'Айдентика',
      description: 'Разработка логотипов и фирменного стиля',
      price: 'от 15 000 ₽',
      icon: 'Palette'
    },
    {
      title: 'Презентации',
      description: 'Дизайн презентаций для бизнеса и выступлений',
      price: 'от 10 000 ₽',
      icon: 'Presentation'
    },
    {
      title: 'Соц. сети',
      description: 'Оформление постов и сторис для Instagram',
      price: 'от 5 000 ₽',
      icon: 'Image'
    }
  ];

  const testimonials = [
    {
      name: 'Максим Орлов',
      role: 'CEO Tech Startup',
      text: 'Инфографика от KK помогла нам выиграть инвестиционный питч. Данные ожили!',
      rating: 5
    },
    {
      name: 'Ольга Зайцева',
      role: 'Маркетолог',
      text: 'Лучший дизайнер инфографики! Сложные данные превращает в понятные визуалы.',
      rating: 5
    },
    {
      name: 'Игорь Новиков',
      role: 'Бренд-менеджер',
      text: 'Сотрудничаем уже 2 года. Всегда свежие идеи и быстрая реализация.',
      rating: 5
    }
  ];

  const addWatermark = (imageUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      ctx.font = 'bold 48px Montserrat';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const watermarkText = '© KK';
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
      
      const watermarkedUrl = canvas.toDataURL('image/jpeg', 0.95);
      setSelectedImage(watermarkedUrl);
    };
    img.src = imageUrl;
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'about', 'services', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            KK
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: 'Главная' },
              { id: 'portfolio', label: 'Портфолио' },
              { id: 'about', label: 'Обо мне' },
              { id: 'services', label: 'Услуги' },
              { id: 'testimonials', label: 'Отзывы' },
              { id: 'contact', label: 'Контакты' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Связаться
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                Графический дизайн инфографики
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Данные в
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {' '}визуальные истории
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Превращаю сложные данные в понятную и красивую инфографику. 
                Помогаю брендам говорить визуально с защитой авторских прав.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
                  onClick={() => scrollToSection('portfolio')}
                >
                  Портфолио
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="Briefcase" size={20} className="mr-2" />
                  Заказать дизайн
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/7679d6d0-24a9-4963-ab84-7a54ff25ba65/files/de62ec34-996e-4973-999b-34495e401f41.jpg"
                alt="Graphic Design Studio"
                className="relative rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 mb-4">
              Портфолио
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Проекты инфографики
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Все работы защищены водяными знаками для демонстрации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioImages.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer animate-scale-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => addWatermark(img)}
              >
                <img
                  src={img}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold">Нажмите для просмотра с водяным знаком</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary">
                    <Icon name="Shield" size={14} className="mr-1" />
                    Защищено
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-12 right-0 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <Icon name="X" size={24} />
                </Button>
                <img
                  src={selectedImage}
                  alt="Watermarked"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                Обо мне
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Привет! Я графический дизайнер с 7-летним опытом
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Моя страсть — превращать данные в визуальные истории, которые вовлекают и объясняют. 
                Работаю с брендами, стартапами и агентствами по всему миру.
              </p>

              <div className="space-y-4">
                {[
                  { icon: 'Award', text: 'Лауреат конкурса "Best Infographic Design 2023"' },
                  { icon: 'Users', text: 'Более 300 реализованных проектов' },
                  { icon: 'Palette', text: 'Работа в Adobe Illustrator и Figma' },
                  { icon: 'Zap', text: 'Быстрая разработка — от 2 дней' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                      <Icon name={item.icon} size={20} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-scale-in">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 h-48 flex items-center justify-center hover:scale-105 transition-transform">
                    <Icon name="PenTool" size={48} className="text-primary/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
              Услуги
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Что я предлагаю
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полный спектр услуг графического дизайна и инфографики
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary hover:shadow-xl transition-all duration-300 animate-scale-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                    <Icon name={service.icon} size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 mb-4">
              Отзывы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Что говорят клиенты
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Честные отзывы от людей, с которыми я работал
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-secondary hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-secondary to-accent p-4 rounded-full">
                      <Icon name="User" size={24} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 mb-4">
              Контакты
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Давайте работать вместе
            </h2>
            <p className="text-xl text-gray-600">
              Заполните форму и я свяжусь с вами в течение 24 часов
            </p>
          </div>

          <Card className="border-2 animate-scale-in">
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваше имя</label>
                  <Input placeholder="Иван Иванов" className="h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="ivan@example.com" className="h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input type="tel" placeholder="+7 (999) 123-45-67" className="h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <Textarea 
                    placeholder="Расскажите о вашем проекте..." 
                    className="min-h-32"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-lg"
                >
                  Отправить заявку
                  <Icon name="Send" size={20} className="ml-2" />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t grid grid-cols-3 gap-4 text-center">
                <div>
                  <Icon name="Phone" size={24} className="mx-auto text-primary mb-2" />
                  <div className="text-sm text-gray-600">+7 (999) 123-45-67</div>
                </div>
                <div>
                  <Icon name="Mail" size={24} className="mx-auto text-secondary mb-2" />
                  <div className="text-sm text-gray-600">photo@studio.ru</div>
                </div>
                <div>
                  <Icon name="MapPin" size={24} className="mx-auto text-accent mb-2" />
                  <div className="text-sm text-gray-600">Москва, Россия</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-bold">KK</div>
            
            <div className="flex gap-6">
              {['Instagram', 'Facebook', 'Twitter', 'Youtube'].map((social) => (
                <button 
                  key={social}
                  className="hover:scale-110 transition-transform"
                >
                  <Icon name={social} size={24} />
                </button>
              ))}
            </div>

            <div className="text-sm opacity-90">
              © 2024 KK. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;