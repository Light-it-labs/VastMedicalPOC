<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Lightit\Insurance\Domain\DataTransferObjects\PharmacyBenefitCheckDto;
use Lightit\Shared\App\Enums\USState;

class PharmacyBenefitCheckRequest extends FormRequest
{
    public const PAYER = 'payer';
    public const STATE = 'state';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::PAYER => ['required', 'string'],
            self::STATE => ['required', new Enum(USState::class)],
        ];
    }

    public function toDto(): PharmacyBenefitCheckDto
    {
        return new PharmacyBenefitCheckDto(
            payer: $this->string(self::PAYER)->toString(),
            state: USState::from($this->string(self::STATE)->toString()),
        );
    }
}
