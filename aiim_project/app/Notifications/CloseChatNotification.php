<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CloseChatNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject("Zamknięcie czatu")
                    ->greeting("Witaj!")
                    ->lines([
                        "Zauważyliśmy, że czat, którego jesteś użytkownikiem był nieaktywny od 3 dni",
                        "Czy uzyskałeś/aś odpowiednią odpowiedź i chciałbyś/chciałabyś zamknąć czat?",
                        "Jeżeli tak, to skorzystaj z linku poniżej aby zamknąć chat:"
                    ])
                    ->action('Zamknięcie czatu', url('/api/close'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'message' => 'Czy chcesz zamknąć czat?',
            'action' => 'close-chat',
        ];
    }

    
}
