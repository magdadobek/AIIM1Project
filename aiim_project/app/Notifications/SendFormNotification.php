<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendFormNotification extends Notification
{
    use Queueable;

    private $formData;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($formData)
    {
        $this->formData = $formData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];
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
            ->subject('Nowe zgłoszenie z formularza')
            ->greeting('Witaj!')
            ->line('Nowe zgłoszenie z formularza oczekuje na Twoją odpowiedź.')
            ->line('Szczegóły zgłoszenia:')
            ->line(json_encode($this->formData))
            ->line('Dziękujemy za współpracę!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'type' => 'form_submission',
            'title' => 'Nowe zgłoszenie z formularza',
            'body' => 'Nowe zgłoszenie z formularza oczekuje na Twoją odpowiedź.',
            'form_data' => $this->formData,
            'read' => false,
            'created_at' => Carbon::now()
        ];
    }
}
