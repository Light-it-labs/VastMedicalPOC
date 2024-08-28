<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareAdvantageEligibilityCheckDto;
use Lightit\Shared\App\Enums\USState;

class MedicareAdvantageEligibilityCheckRequest extends FormRequest
{
    public const MEMBER_ID = 'member_id';
    public const PAYER = 'payer';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const DOB = 'dob';
    public const STATE = 'state';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::MEMBER_ID => ['required', 'string'],
            self::PAYER => ['required', 'string'],
            self::FIRST_NAME => ['required', 'string'],
            self::LAST_NAME => ['required', 'string'],
            self::DOB => ['required', 'date'],
            self::STATE => ['required', 'string', Rule::enum(USState::class)],

        ];
    }

    public function toDto(): MedicareAdvantageEligibilityCheckDto
    {
        /** @var Carbon $dob */
        $dob = $this->date(self::DOB);

        return new MedicareAdvantageEligibilityCheckDto(
            member_id: $this->string(self::MEMBER_ID)->toString(),
            payer: $this->string(self::PAYER)->toString(),
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            dob: $dob,
            state: USState::from($this->string(self::STATE)->toString())
        );
    }
}
