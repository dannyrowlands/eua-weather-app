<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favourite extends Model
{
    use HasFactory;

    /**
     * @return BelongsTo
     */
    public function favourites(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
}
