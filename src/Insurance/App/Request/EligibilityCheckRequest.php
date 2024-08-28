<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityCheckDto;
use Lightit\Shared\App\Enums\USState;

class EligibilityCheckRequest extends FormRequest
{
    public const MEMBER_ID = 'member_id';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const DOB = 'dob';

    public const STREET = 'street';
    public const CITY = 'city';
    public const STATE = 'state';
    public const ZIP = 'zip';

    public const PLAN_TYPE = 'plan_type';
    public const DIABETES_TYPE = 'diabetes_type';
    public const DIABETES_MANAGEMENT = 'diabetes_management';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::MEMBER_ID => ['required', 'string'],
            self::FIRST_NAME => ['required', 'string'],
            self::LAST_NAME => ['required', 'string'],
            self::DOB => ['required', 'date'],

            self::STREET => ['required', 'string'],
            self::CITY => ['required', 'string'],
            self::STATE => ['required', new Enum(USState::class)],
            self::ZIP => ['required', 'string'],

            self::PLAN_TYPE => ['required', 'string'],
            self::DIABETES_TYPE => ['required', 'string'],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('state') && is_string($this->state)) {
            $this->merge([
                'state' => strtoupper($this->state),
            ]);
        }
    }

    public function toDto(): EligibilityCheckDto
    {
        /** @var Carbon $dob */
        $dob = $this->date(self::DOB);

        return new EligibilityCheckDto(
            member_id: $this->string(self::MEMBER_ID)->toString(),
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            dob: $dob,
            street: $this->string(self::STREET)->toString(),
            city: $this->string(self::CITY)->toString(),
            state: USState::from($this->string(self::STATE)->toString()),
            zip: $this->string(self::ZIP)->toString(),
            plan_type: $this->string(self::PLAN_TYPE)->toString(),
            diabetes_type: $this->string(self::DIABETES_TYPE)->toString(),
            diabetes_management: $this->string(self::DIABETES_MANAGEMENT)->toString(),
        );
    }
}
