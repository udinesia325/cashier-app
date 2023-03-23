<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class InvoiceJsonRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //

        $dataJson = json_decode($value);
        if (is_array($dataJson)) {
            foreach ($dataJson as $d) {
                if (!isset($d->name) || !isset($d->price)) {
                    $fail(":attribute harus memiliki attribut name dan price");
                }
            }
        } else {
            $fail(":attribute tidak valid");
        }
    }
}
